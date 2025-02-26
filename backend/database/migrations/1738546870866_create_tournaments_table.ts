import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tournaments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.timestamp('start_date').notNullable()
      table.timestamp('end_date').notNullable()
      table.string('location').notNullable()
      table.integer('price').defaultTo(0)
      table.enu('type', ['bracket', 'round-robin']).defaultTo('bracket')
      table.boolean('seed').defaultTo(false)
      table.boolean('consolation').defaultTo(false)
      table.integer('max_teams').defaultTo(20)
      table.integer('team_registered').defaultTo(0)
      table.enu('status', ['upcoming', 'ongoing', 'completed']).defaultTo('upcoming')
      table
        .enu('difficulty', ['P25', 'P100', 'P250', 'P500', 'P1000', 'P2000', 'any'])
        .defaultTo('any')
      table.enu('category', ['men', 'women', 'mixte']).defaultTo('any')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
