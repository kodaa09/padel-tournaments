import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Tournament from './tournament.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Match from './match.js'

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare tournamentId: number

  @belongsTo(() => Tournament)
  declare tournament: BelongsTo<typeof Tournament>

  @hasMany(() => Match, {
    foreignKey: 'team1Id',
  })
  declare matchesAsTeam1: HasMany<typeof Match>

  @hasMany(() => Match, {
    foreignKey: 'team2Id',
  })
  declare matchesAsTeam2: HasMany<typeof Match>

  @manyToMany(() => User, {
    pivotTable: 'user_teams',
  })
  declare players: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
