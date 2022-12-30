const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/home');
const loginController = require('./src/controllers/login');
const contatoController = require('./src/controllers/contato');

const { loginRequired } = require('./src/middlewares/middleware')

// Rotas da home
route.get('/', homeController.index);

// Rotas de Login
route.get('/login/', loginController.index)
route.post('/login/register/', loginController.register)
route.post('/login/signin/', loginController.signin)
route.get('/logout/', loginController.logout)

//Rotas de contato
route.get('/contato/', loginRequired, contatoController.index);
route.post('/contato/register/', loginRequired, contatoController.register);
route.get('/contato/:id/', loginRequired, contatoController.dadosContato);
route.post('/contato/edit/:id/', loginRequired, contatoController.edit);
route.get('/contato/delete/:id/', loginRequired, contatoController.delete);

module.exports = route;
