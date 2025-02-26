import type { HttpContext } from '@adonisjs/core/http'
import Team from '#models/team'

export default class TeamsController {
  /**
   * Récupère toutes les équipes
   */
  async index({ response }: HttpContext) {
    const teams = await Team.query()
      .preload('tournament')
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
    const payload = request.only(['name', 'tournamentId', 'player1Id', 'player2Id'])
    const team = await Team.create(payload)

    await Promise.all([
      team.load('tournament'),
      team.load('player1'),
      team.load('player2'),
      team.load('matchesAsTeam1'),
      team.load('matchesAsTeam2'),
      team.load('matchesAsWinner'),
    ])

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
    const payload = request.only(['name', 'tournamentId', 'player1Id', 'player2Id'])

    const updateData: any = { name: payload.name }
    if (payload.tournamentId) {
      updateData.tournamentId = payload.tournamentId
    }

    await team.merge(updateData).save()

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
