import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Team from './team.js'
import Tournament from './tournament.js'
import { randomUUID } from 'node:crypto'

export default class Match extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare fieldNumber: number

  @column()
  declare team1Score: number

  @column()
  declare team2Score: number

  @column()
  declare status: string

  @column()
  declare team1Id: string

  @column()
  declare team2Id: string

  @column()
  declare tournamentId: string

  @column()
  declare winnerId: string

  @column()
  declare date: DateTime

  @belongsTo(() => Team, {
    foreignKey: 'team1Id',
  })
  declare team1: BelongsTo<typeof Team>

  @belongsTo(() => Team, {
    foreignKey: 'team2Id',
  })
  declare team2: BelongsTo<typeof Team>

  @belongsTo(() => Team, {
    foreignKey: 'winnerId',
  })
  declare winnerTeam: BelongsTo<typeof Team>

  @belongsTo(() => Tournament)
  declare tournament: BelongsTo<typeof Tournament>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(match: Match) {
    match.id = randomUUID()
  }
}
