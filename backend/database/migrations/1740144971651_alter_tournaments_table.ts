import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tournaments'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('price').defaultTo(0)
      table.integer('max_teams').defaultTo(20)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, () => {})
  }
}
