const { Router } = require('express')
const UserController = require('../controllers/UserController')
const SearchAdController = require('../controllers/SearchAdController')
const AdController = require('../controllers/AdController')
const SessionController = require('../controllers/SessionController')
const EnsureAuthenticated = require('../middlewares/ensureAuthenticated')
const routes = Router()

routes.get('/searchs', SearchAdController.show) // mostrar anuncios por área de interesse
routes.get('/searchs/:userId', SearchAdController.index) // pegar dados do anuncio que foi clicado
routes.get('/ads/:id', AdController.index) // pega um unico anuncio pelo id
routes.post('/users', UserController.store) // adicionar usuário
routes.post('/sessions', SessionController.store) // fazer login

routes.use(EnsureAuthenticated) // autenticação

routes.get('/ads', AdController.show) // mostrar anuncios do usuario
routes.delete('/ads/:id', AdController.destroy) // remover anuncio
routes.put('/users', UserController.update) // editar dados do usuário
routes.post('/ads', AdController.store) // adicionar anuncio
routes.put('/ads/:id', AdController.update) // editar dados do anuncio

module.exports = routes