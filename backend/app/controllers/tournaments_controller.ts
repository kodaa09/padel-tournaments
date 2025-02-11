import type { HttpContext } from '@adonisjs/core/http'
import Tournament from '#models/tournament'

export default class TournamentsController {
  /**
   * Récupère la liste des tournois
   */
  async index({ response }: HttpContext) {
    const tournaments = await Tournament.query().preload('teams').preload('matchs')

    return response.status(200).json({
      status: 'success',
      message: 'Liste des tournois récupérée avec succès',
      data: tournaments,
    })
  }

  /**
   * Crée un nouveau tournoi
   */
  async store({ request, response }: HttpContext) {
    const tournamentData = request.only([
      'name',
      'startDate',
      'endDate',
      'location',
      'status',
      'diffciulty',
      'categorie',
    ])

    const tournament = await Tournament.create(tournamentData)

    return response.status(201).json({
      status: 'success',
      message: 'Tournoi créé avec succès',
      data: tournament,
    })
  }

  /**
   * Récupère un tournoi spécifique
   */
  async show({ params, response }: HttpContext) {
    const tournament = await Tournament.query()
      .where('id', params.id)
      .preload('teams')
      .preload('matchs')
      .firstOrFail()

    return response.status(200).json({
      status: 'success',
      message: 'Tournoi récupéré avec succès',
      data: tournament,
    })
  }

  /**
   * Met à jour un tournoi existant
   */
  async update({ params, request, response }: HttpContext) {
    const tournament = await Tournament.findOrFail(params.id)

    const tournamentData = request.only([
      'name',
      'startDate',
      'endDate',
      'location',
      'status',
      'diffciulty',
      'categorie',
    ])

    await tournament.merge(tournamentData).save()

    await tournament.load('teams')
    await tournament.load('matchs')

    return response.status(200).json({
      status: 'success',
      message: 'Tournoi mis à jour avec succès',
      data: tournament,
    })
  }

  /**
   * Supprime un tournoi
   */
  async destroy({ params, response }: HttpContext) {
    const tournament = await Tournament.findOrFail(params.id)
    await tournament.delete()

    return response.status(204)
  }
}
