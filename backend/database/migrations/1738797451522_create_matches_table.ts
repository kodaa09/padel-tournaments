import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'matches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
      table.integer('field_number')
      table.integer('team1_score')
      table.integer('team2_score')
      table.enu('status', ['upcoming', 'ongoing', 'done']).notNullable()
      table.uuid('team1_id').unsigned().references('teams.id').onDelete('CASCADE')
      table.uuid('team2_id').unsigned().references('teams.id').onDelete('CASCADE')
      table.uuid('tournament_id').unsigned().references('tournaments.id').onDelete('CASCADE')
      table.uuid('winner_id').unsigned().nullable().references('teams.id').onDelete('SET NULL')
      table.timestamp('date')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
