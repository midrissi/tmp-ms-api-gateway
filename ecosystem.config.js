const { join } = require('path');

module.exports = {
  apps : [{
    name: 'μservice',
    script: 'npm start',
    cwd: join(__dirname, 'api-gateway'),
    instances: 1,
    increment_var : 'PORT',
    env: {
      PORT: 3000,
    }
  }, {
    name: 'API gateway',
    script: 'npm run start:dev',
    cwd: join(__dirname, 'cabins-ms'),
    instances: 1,
    increment_var : 'PORT',
    env: {
      PORT: 5000,
    }
  }],
};
