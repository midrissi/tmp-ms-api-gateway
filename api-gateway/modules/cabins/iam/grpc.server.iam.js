const ctrls = require('../controllers/grpc.server.controller');

/**
* @type { IAM.default }
*/
module.exports = {
  prefix: '/cabins/grpc',
  routes: [{
    path: '/',
    methods: {
      /**
       * @params
       * [{
       *   "key": "$skip",
       *   "value": "0",
       *   "description": "Number of records to skip"
       * }, {
       *   "key": "$top",
       *   "value": "10",
       *   "description": "Number of records to return"
       * }]
       */
      get: {
        iam: 'modules:cabins:grpc:list',
        title: 'List all cabins',
        parents: ['modules:cabins', 'modules:cabins:grpc'],
        groups: [],
        description: 'List all cabins',
        middlewares: [
          ctrls.list,
        ],
      },
      /**
       * @body
       * {
       *   "name": "New cabine",
       *   "number": 12
       * }
       */
      post: {
        iam: 'modules:cabins:grpc:create',
        title: 'Create new cabine',
        groups: [],
        parents: ['modules:cabins', 'modules:cabins:grpc'],
        description: 'Create a new cabin',
        middlewares: [
          ctrls.create,
        ],
      },
    },
  }],
};
