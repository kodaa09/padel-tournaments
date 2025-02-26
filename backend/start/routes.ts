import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const UsersController = () => import('#controllers/users_controller')
const TournamentsController = () => import('#controllers/tournaments_controller')
const TeamsController = () => import('#controllers/teams_controller')
const MatchesController = () => import('#controllers/matches_controller')

router
  .group(() => {
    router.post('/auth/signup', [UsersController, 'signup'])
    router.post('/auth/login', [UsersController, 'login'])
    router.post('/auth/logout', [UsersController, 'logout']).use(middleware.auth())
    router.get('/auth/me', [UsersController, 'me']).use(middleware.auth())
    router.get('/auth/check', [UsersController, 'check']).use(middleware.auth())

    router
      .get('/users/license-number/:licenseNumber', [UsersController, 'showByLicenseNumber'])
      .use(middleware.auth())

    router.get('/tournaments', [TournamentsController, 'index'])
    router.post('/tournaments', [TournamentsController, 'store']).use(middleware.admin())
    router.get('/tournaments/:id', [TournamentsController, 'show'])
    router.put('/tournaments/:id', [TournamentsController, 'update']).use(middleware.admin())
    router.delete('/tournaments/:id', [TournamentsController, 'destroy']).use(middleware.admin())

    router.get('/teams', [TeamsController, 'index'])
    router.post('/teams', [TeamsController, 'store']).use(middleware.auth())
    router.get('/teams/:id', [TeamsController, 'show'])
    router.put('/teams/:id', [TeamsController, 'update']).use(middleware.admin())
    router.delete('/teams/:id', [TeamsController, 'destroy']).use(middleware.admin())

    router.get('/matches', [MatchesController, 'index'])
    router.post('/matches', [MatchesController, 'store']).use(middleware.admin())
    router.get('/matches/:id', [MatchesController, 'show'])
    router.put('/matches/:id', [MatchesController, 'update']).use(middleware.admin())
    router.delete('/matches/:id', [MatchesController, 'destroy']).use(middleware.admin())
  })
  .prefix('/api')
