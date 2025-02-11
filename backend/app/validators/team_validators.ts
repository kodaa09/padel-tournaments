import vine from '@vinejs/vine'

export const createTeamValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(50),
    tournament_id: vine.string().uuid(),
    playerIds: vine.array(vine.string().uuid()),
  })
)

export const updateTeamValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(50).optional(),
    tournament_id: vine.string().uuid().optional(),
    playerIds: vine.array(vine.string().uuid()).optional(),
  })
)
