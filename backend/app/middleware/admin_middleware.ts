import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

/**
 * Middleware pour vérifier si l'utilisateur est admin
 */
export default class AdminMiddleware {
  /**
   * L'URL de redirection en cas d'échec d'authentification ou de droits insuffisants
   */
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    // Vérifie d'abord si l'utilisateur est authentifié
    await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })

    // Récupère l'utilisateur authentifié
    const user = ctx.auth.user

    // Vérifie si l'utilisateur est admin
    if (!user || user.role !== 'admin') {
      return ctx.response.status(403).json({
        status: 'error',
        message: 'Accès non autorisé. Privilèges administrateur requis.',
      })
    }

    return next()
  }
}
