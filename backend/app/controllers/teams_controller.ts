import type { HttpContext } from '@adonisjs/core/http'
import Team from '#models/team'
import { createTeamValidator, updateTeamValidator } from '#validators/team_validators'

export default class TeamsController {
  /**
   * Récupère toutes les équipes
   */
  async index({ response }: HttpContext) {
    const teams = await Team.query()
      .preload('tournament')
      .preload('players')
      .preload('player1')
      .preload('player2')
      .preload('matchesAsTeam1')
      .preload('matchesAsTeam2')
      .preload('matchesAsWinner')

    return response.status(200).json({
      status: 'success',
      message: 'Liste des équipes récupérée avec succès',
      data: teams,
    })
  }

  /**
   * Récupère une équipe spécifique
   */
  async show({ params, response }: HttpContext) {
    const team = await Team.query()
      .where('id', params.id)
      .preload('tournament')
      .preload('players')
      .preload('player1')
      .preload('player2')
      .preload('matchesAsTeam1')
      .preload('matchesAsTeam2')
      .preload('matchesAsWinner')
      .firstOrFail()

    return response.status(200).json({
      status: 'success',
      message: 'Équipe récupérée avec succès',
      data: team,
    })
  }

  /**
   * Crée une nouvelle équipe
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createTeamValidator)
    const team = await Team.create({
      name: payload.name,
      tournamentId: payload.tournament_id,
      player1Id: payload.playerIds[0],
      player2Id: payload.playerIds[1],
    })

    if (payload.playerIds) {
      await team.related('players').attach(payload.playerIds)
    }

    await team.load('players')
    await team.load('tournament')
    await team.load('player1')
    await team.load('player2')
    await team.load('matchesAsTeam1')
    await team.load('matchesAsTeam2')
    await team.load('matchesAsWinner')

    return response.status(201).json({
      status: 'success',
      message: 'Équipe créée avec succès',
      data: team,
    })
  }

  /**
   * Met à jour une équipe existante
   */
  async update({ params, request, response }: HttpContext) {
    const team = await Team.findOrFail(params.id)
    const payload = await request.validateUsing(updateTeamValidator)

    const updateData: any = { name: payload.name }
    if (payload.tournament_id) {
      updateData.tournamentId = payload.tournament_id
    }
    if (payload.playerIds) {
      updateData.player1Id = payload.playerIds[0]
      updateData.player2Id = payload.playerIds[1]
    }

    await team.merge(updateData).save()

    if (payload.playerIds) {
      await team.related('players').sync(payload.playerIds)
    }

    await team.load('players')
    await team.load('tournament')
    await team.load('player1')
    await team.load('player2')
    await team.load('matchesAsTeam1')
    await team.load('matchesAsTeam2')
    await team.load('matchesAsWinner')

    return response.status(200).json({
      status: 'success',
      message: 'Équipe mise à jour avec succès',
      data: team,
    })
  }

  /**
   * Supprime une équipe
   */
  async destroy({ params, response }: HttpContext) {
    const team = await Team.findOrFail(params.id)
    await team.delete()

    return response.status(204)
  }
}
