import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_teams'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('player1_id').unsigned().references('users.license_number').onDelete('CASCADE')
      table.uuid('player2_id').unsigned().references('users.license_number').onDelete('CASCADE')
      table.uuid('tournament_id').unsigned().references('tournaments.id').onDelete('CASCADE')

      table.unique(['player1_id', 'player2_id', 'tournament_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
