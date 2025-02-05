import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tournament_teams'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('tournament_id').unsigned().references('tournaments.id').onDelete('CASCADE')
      table.uuid('team_id').unsigned().references('teams.id').onDelete('CASCADE')
      table.unique(['tournament_id', 'team_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
