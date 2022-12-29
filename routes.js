const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/home');
const loginController = require('./src/controllers/login');

// Rotas da home
route.get('/', homeController.index);

// Rotas de Login
route.get('/login/', loginController.index)
route.post('/login/register/', loginController.register)
route.post('/login/signin/', loginController.signin)
route.get('/logout/', loginController.logout)


module.exports = route;
