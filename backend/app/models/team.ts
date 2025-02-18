import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  belongsTo,
  column,
  hasMany,
  manyToMany,
} from '@adonisjs/lucid/orm'
import Tournament from './tournament.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Match from './match.js'
import { randomUUID } from 'node:crypto'

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare tournamentId: string

  @column()
  declare player1Id: string

  @column()
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

  @hasMany(() => Match, {
    foreignKey: 'team1Id',
  })
  declare matchesAsTeam1: HasMany<typeof Match>

  @hasMany(() => Match, {
    foreignKey: 'team2Id',
  })
  declare matchesAsTeam2: HasMany<typeof Match>

  @hasMany(() => Match, {
    foreignKey: 'winnerId',
  })
  declare matchesAsWinner: HasMany<typeof Match>

  @manyToMany(() => User, {
    pivotTable: 'user_teams',
  })
  declare players: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(team: Team) {
    team.id = randomUUID()
  }
}
