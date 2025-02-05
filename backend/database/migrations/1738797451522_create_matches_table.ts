import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'matches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
      table.integer('field_number')
      table.integer('score_first_team')
      table.integer('score_second_team')
      table.enu('status', ['upcoming', 'ongoing', 'done']).notNullable()
      table.uuid('tournament_id').unsigned().references('tournaments.id').onDelete('CASCADE')
      table.uuid('first_team_id').unsigned().references('teams.id').onDelete('CASCADE')
      table.uuid('second_team_id').unsigned().references('teams.id').onDelete('CASCADE')
      table.uuid('winner_id').unsigned().nullable().references('teams.id').onDelete('SET NULL')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
