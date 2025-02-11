import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const UsersController = () => import('#controllers/users_controller')
const TournamentsController = () => import('#controllers/tournaments_controller')
const TeamsController = () => import('#controllers/teams_controller')
const MatchesController = () => import('#controllers/matches_controller')

router.post('/auth/signup', [UsersController, 'signup'])
router.post('/auth/login', [UsersController, 'login'])
router.post('/auth/logout', [UsersController, 'logout']).use(middleware.auth())
router.get('/auth/me', [UsersController, 'me']).use(middleware.auth())
router.get('/auth/check', [UsersController, 'check']).use(middleware.auth())

router
  .group(() => {
    router.get('/tournaments', [TournamentsController, 'index']).use(middleware.auth())
    router.post('/tournaments', [TournamentsController, 'store']).use(middleware.auth())
    router.get('/tournaments/:id', [TournamentsController, 'show']).use(middleware.auth())
    router.put('/tournaments/:id', [TournamentsController, 'update']).use(middleware.auth())
    router.delete('/tournaments/:id', [TournamentsController, 'destroy']).use(middleware.auth())

    router.get('/teams', [TeamsController, 'index']).use(middleware.auth())
    router.post('/teams', [TeamsController, 'store']).use(middleware.auth())
    router.get('/teams/:id', [TeamsController, 'show']).use(middleware.auth())
    router.put('/teams/:id', [TeamsController, 'update']).use(middleware.auth())
    router.delete('/teams/:id', [TeamsController, 'destroy']).use(middleware.auth())

    router.get('/matches', [MatchesController, 'index']).use(middleware.auth())
    router.post('/matches', [MatchesController, 'store']).use(middleware.auth())
    router.get('/matches/:id', [MatchesController, 'show']).use(middleware.auth())
    router.put('/matches/:id', [MatchesController, 'update']).use(middleware.auth())
    router.delete('/matches/:id', [MatchesController, 'destroy']).use(middleware.auth())
  })
  .prefix('/api')
