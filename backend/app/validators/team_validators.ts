import vine from '@vinejs/vine'

export const createTeamValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(50),
    tournamentId: vine.string().uuid(),
    player1Id: vine.string().uuid(),
    player2Id: vine.string().uuid(),
  })
)

export const updateTeamValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(50).optional(),
    tournamentId: vine.string().uuid(),
    player1Id: vine.string().uuid(),
    player2Id: vine.string().uuid(),
  })
)
