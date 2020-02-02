const authenticationRouter = require('express').Router();
const controller = require('../controller/controller');

authenticationRouter.post('/signup', controller.createUser);
authenticationRouter.post('/signin', controller.signin);
authenticationRouter.get('/getcurrentuser', controller.getCurrentUser);
authenticationRouter.delete('/logout', controller.logout);

module.exports = authenticationRouter;
