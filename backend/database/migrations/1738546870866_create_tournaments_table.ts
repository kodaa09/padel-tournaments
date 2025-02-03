import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tournaments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.timestamp('start_date').notNullable()
      table.timestamp('end_date').notNullable()
      table.string('location').notNullable()
      table.enu('status', ['upcoming', 'ongoing', 'completed']).defaultTo('upcoming')
      table
        .enu('diffciulty', ['P25', 'P100', 'P250', 'P500', 'P1000', 'P2000', 'any'])
        .defaultTo('any')
      table.enu('categorie', ['men', 'women', 'mixte']).defaultTo('any')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
