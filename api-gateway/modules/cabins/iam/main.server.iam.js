const ctrls = require('../controllers/main.server.controller');

/**
* @type { IAM.default }
*/
module.exports = {
  prefix: '/cabins',
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
        iam: 'modules:cabins:main:list',
        title: 'List all cabins',
        parents: ['modules:cabins', 'modules:cabins:main'],
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
        iam: 'modules:cabins:main:create',
        title: 'Create new cabine',
        groups: [],
        parents: ['modules:cabins', 'modules:cabins:main'],
        description: 'Create a new cabin',
        middlewares: [
          ctrls.create,
        ],
      },
    },
  }],
};
