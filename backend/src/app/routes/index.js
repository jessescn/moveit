const routes = require('express').Router();
const userController = require('../controllers/userController')

routes.post('/login', userController.login)
routes.get('/users', userController.getAllUsers)
routes.put('/users', userController.updateUser)

module.exports = routes;