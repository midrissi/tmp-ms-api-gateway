const { Transport } = require('@nestjs/microservices');

const SCOPE = 'cabins';

module.exports = (config) => {
  const { env } = config.utils;
  const t = env.get('MS_TRANSPORT', SCOPE);
  let transport;
  let options;


  switch (t) {
    case 'RMQ':
      transport = Transport.RMQ;
      options = {
        urls: [env.get('MS_RMQ_URL', SCOPE)],
        queue: env.get('MS_RMQ_QUEUE', SCOPE),
        queueOptions: {
          durable: env.get('MS_RMQ_QUEUE_DURABLE', SCOPE),
        },
      };
      break;
    case 'REDIS':
      transport = Transport.REDIS;
      options = {
        url: env.get('MS_REDIS_URL', SCOPE),
      };
      break;
    case 'TCP':
    default:
      transport = Transport.TCP;
      options = {
        host: env.get('MS_TCP_HOST', SCOPE),
        port: env.get('MS_TCP_PORT', SCOPE),
      };
      break;
  }

  return {
    cabins: {
      ms: { transport, options },
    },
  };
};
