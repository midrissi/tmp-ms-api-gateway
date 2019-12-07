const { ClientProxyFactory } = require('@nestjs/microservices');

module.exports = (app, db, config) => {
  const { transport, options } = config.cabins.ms;
  const cabins = ClientProxyFactory.create({
    options,
    transport,
  });

  app.use(async (req, res, next) => {
    req.clients = { ...req.clients, cabins };
    return next();
  });
};
