const { Transport } = require('@nestjs/microservices');

const SCOPE = 'cabins';

module.exports = (config) => {
  const { env } = config.utils;

  return {
    cabins: {

      ms: {
        // transport: Transport.TCP,
        // options: {
        //   host: env.get('MS_TCP_HOST', SCOPE),
        //   port: env.get('MS_TCP_PORT', SCOPE),
        // },
        // transport: Transport.REDIS,
        // options: {
        //   url: env.get('MS_REDIS_URL', SCOPE),
        // },
        transport: Transport.RMQ,
        options: {
          urls: [env.get('MS_RMQ_URL', SCOPE)],
          queue: env.get('MS_RMQ_QUEUE', SCOPE),
          queueOptions: {
            durable: env.get('MS_RMQ_QUEUE_DURABLE', SCOPE),
          },
        },
      },
    },
  };
};
