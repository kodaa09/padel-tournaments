import type { HttpContext } from '@adonisjs/core/http'
import Match from '#models/match'

export default class MatchesController {
  /**
   * Récupère la liste des matchs
   */
  async index({ response }: HttpContext) {
    const matches = await Match.query()
      .preload('team1')
      .preload('team2')
      .preload('winnerTeam')
      .preload('tournament')

    return response.status(200).json({
      status: 'success',
      message: 'Liste des matchs récupérée avec succès',
      data: matches,
    })
  }

  /**
   * Crée un nouveau match
   */
  async store({ request, response }: HttpContext) {
    const matchData = request.only([
      'fieldNumber',
      'team1Score',
      'team2Score',
      'status',
      'team1Id',
      'team2Id',
      'tournamentId',
      'winnerId',
      'date',
    ])

    // Vérification que les équipes existent et sont différentes
    if (matchData.team1Id === matchData.team2Id) {
      return response.status(400).json({
        status: 'error',
        message: 'Les deux équipes doivent être différentes',
      })
    }

    // Vérification que le gagnant est l'une des deux équipes
    if (
      matchData.winnerId &&
      matchData.winnerId !== matchData.team1Id &&
      matchData.winnerId !== matchData.team2Id
    ) {
      return response.status(400).json({
        status: 'error',
        message: "Le gagnant doit être l'une des deux équipes",
      })
    }

    const match = await Match.create(matchData)

    await match.load('team1')
    await match.load('team2')
    await match.load('winnerTeam')
    await match.load('tournament')

    return response.status(201).json({
      status: 'success',
      message: 'Match créé avec succès',
      data: match,
    })
  }

  /**
   * Récupère un match spécifique
   */
  async show({ params, response }: HttpContext) {
    const match = await Match.query()
      .where('id', params.id)
      .preload('team1')
      .preload('team2')
      .preload('winnerTeam')
      .preload('tournament')
      .firstOrFail()

    return response.status(200).json({
      status: 'success',
      message: 'Match récupéré avec succès',
      data: match,
    })
  }

  /**
   * Met à jour un match existant
   */
  async update({ params, request, response }: HttpContext) {
    const match = await Match.findOrFail(params.id)

    const matchData = request.only([
      'fieldNumber',
      'team1Score',
      'team2Score',
      'status',
      'team1Id',
      'team2Id',
      'tournamentId',
      'winnerId',
      'date',
    ])

    // Vérification que les équipes sont différentes
    if (matchData.team1Id === matchData.team2Id) {
      return response.status(400).json({
        status: 'error',
        message: 'Les deux équipes doivent être différentes',
      })
    }

    // Vérification que le gagnant est l'une des deux équipes
    if (
      matchData.winnerId &&
      matchData.winnerId !== matchData.team1Id &&
      matchData.winnerId !== matchData.team2Id
    ) {
      return response.status(400).json({
        status: 'error',
        message: "Le gagnant doit être l'une des deux équipes",
      })
    }

    await match.merge(matchData).save()

    await match.load('team1')
    await match.load('team2')
    await match.load('winnerTeam')
    await match.load('tournament')

    return response.status(200).json({
      status: 'success',
      message: 'Match mis à jour avec succès',
      data: match,
    })
  }

  /**
   * Supprime un match
   */
  async destroy({ params, response }: HttpContext) {
    const match = await Match.findOrFail(params.id)
    await match.delete()

    return response.status(204)
  }
}
