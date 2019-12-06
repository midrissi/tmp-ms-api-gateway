const { ClientProxyFactory, Transport } = require('@nestjs/microservices');

module.exports = (app, db, config) => {
  const { ms: options } = config.cabins;
  const cabins = ClientProxyFactory.create({
    options,
    transport: Transport.TCP,
  });

  app.use(async (req, res, next) => {
    req.clients = { ...req.clients, cabins };
    return next();
  });
};
