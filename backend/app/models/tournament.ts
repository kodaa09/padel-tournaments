import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Tournament extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

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
  declare diffciulty: string

  @column()
  declare categorie: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
