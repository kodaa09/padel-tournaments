import { randomUUID } from 'node:crypto'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Team from './team.js'

export default class Tournament extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare startDate: DateTime

  @column()
  declare endDate: DateTime

  @column()
  declare location: string

  @column()
  declare status: string

  @column()
  declare difficulty: string

  @column()
  declare category: string

  @column()
  declare price: number

  @column()
  declare type: string

  @column()
  declare consolation: boolean

  @column()
  declare seed: boolean

  @column()
  declare maxTeams: number

  @column()
  declare teamRegistered: number

  @hasMany(() => Team)
  declare teams: HasMany<typeof Team>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(tournament: Tournament) {
    tournament.id = randomUUID()
  }
}
