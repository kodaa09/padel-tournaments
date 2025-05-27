import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import Tournament from './tournament.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import { randomUUID } from 'node:crypto'

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare tournamentId: string

  @column({ columnName: 'player1_id' })
  declare player1Id: string

  @column({ columnName: 'player2_id' })
  declare player2Id: string

  @belongsTo(() => Tournament)
  declare tournament: BelongsTo<typeof Tournament>

  @belongsTo(() => User, {
    foreignKey: 'player1Id',
  })
  declare player1: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'player2Id',
  })
  declare player2: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(team: Team) {
    team.id = randomUUID()
  }
}
