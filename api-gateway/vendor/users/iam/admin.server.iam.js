
/**
 * Module dependencies.
 */
const adminCtrls = require('../controllers/admin.server.controller');

module.exports = {
  prefix: '/users',
  params: [{
    name: 'userId',
    middleware: adminCtrls.userByID,
  }],
  routes: [{
    path: '/',
    methods: {
      /**
       * @headers
       * {
       *  "Content-Type": "application/json"
       * }
       *
       * @test
       * pm.test("The server respond with 200", () => {
       *  pm.response.to.have.status(200);
       * });
       *
       * @body
       * {
       *  "username": "{{username}}",
       *  "password": "{{password}}"
       * }
       */
      get: {
        parents: ['modules:users:users:manage'],
        middlewares: [
          adminCtrls.list,
        ],
        iam: 'users:admin:list',
        title: 'List users',
        description: 'Gérer la liste des utilisateurs',
      },
    },
  }, {
    path: '/:userId',
    methods: {
      get: {
        parents: ['modules:users:users:manage'],
        middlewares: [
          adminCtrls.read,
        ],
        iam: 'users:admin:read',
        title: 'Get user',
        description: 'Get a specific user using his `id`',
      },
      put: {
        parents: ['modules:users:users:manage'],
        middlewares: [
          adminCtrls.update,
        ],
        iam: 'users:admin:update',
        title: 'Update an existing user',
        description: 'Update a specific user using his identifier',
      },
      delete: {
        parents: ['modules:users:users:manage'],
        middlewares: [
          adminCtrls.delete,
        ],
        iam: 'users:admin:delete',
        title: 'Remove an existing user',
        description: 'Remove a specific user using his identifier',
      },
    },
  }, {
    path: '/:userId/picture',
    methods: {
      get: {
        parents: ['modules:users:users:manage'],
        middlewares: [
          adminCtrls.picture,
          adminCtrls.svg({ size: 46, color: '#d35400', fill: '#ffffff' }),
        ],
        iam: 'users:admin:picture',
        title: 'Get user profile picture',
        description: 'Get the profile picture of an existing using his identifier',
      },
    },
  }],
};
