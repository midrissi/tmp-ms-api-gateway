const SCOPE = 'cabins';

module.exports = (config) => {
  const { env } = config.utils;

  return {
    cabins: {
      ms: {
        host: env.get('MS_HOST', SCOPE),
        port: env.get('MS_PORT', SCOPE),
      },
    },
  };
};
