const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const orderRouter = require('./orders.router');
const customerRouter = require('./customer.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');
const passport = require('passport');

function routerApi(app) {
  const router = express.Router();

  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use(
    '/categories',
    passport.authenticate('jwt', { session: false }),
    categoriesRouter
  );
  router.use('/users', usersRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customerRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerApi;
