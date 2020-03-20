const authenticationRouter = require('express').Router();
const controller = require('../controller');

authenticationRouter.get('/getcurrentuser', controller.getCurrentUser);
authenticationRouter.post('/signup', controller.signup);
authenticationRouter.post('/signupWithGoogle', controller.signupWithGoogle);
authenticationRouter.post('/signin', controller.signin);
authenticationRouter.delete('/logout', controller.logout);

module.exports = authenticationRouter;
