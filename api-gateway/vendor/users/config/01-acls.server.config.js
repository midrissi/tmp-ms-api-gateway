const chalk = require('chalk');
const { resolve } = require('path');
const express = require('express');
// eslint-disable-next-line import/no-unresolved
const { isExcluded } = require('utils');

const Iam = require('../helpers/iam.server.helper');

// eslint-disable-next-line import/no-dynamic-require
const config = require(resolve('config'));

/**
 * Configure the modules server routes
 */
module.exports = (app) => {
  // eslint-disable-next-line
  const regex = /^([a-zA-Z0-9]*)\/([^\/]*)/;
  const iam = new Iam();

  app.use(async (req, res, next) => {
    const roles = req.user && Array.isArray(req.user.roles) ? req.user.roles : ['guest'];

    try {
      req.iams = await iam.IAMsFromRoles(roles);
      req.iams = req.iams.map((item) => ({ ...item, resource: new RegExp(item.resource, 'i') }));
    } catch (e) {
      return next(e);
    }

    return next();
  });

  function isAllowed() {
    let allIAMs;
    return async (req, res, next) => {
      const { iams, user } = req;
      const roles = user && Array.isArray(user.roles) ? user.roles : ['guest'];

      const index = iams.findIndex((item) => {
        const { permission, resource } = item;

        if (resource instanceof RegExp) {
          return resource.test(req.baseUrl + req.route.path)
            && req.method.toLowerCase() === permission;
        }

        return false;
      });

      if (index >= 0) {
        return next();
      }

      if (!allIAMs) {
        try {
          allIAMs = await iam.IamModel.find();
        } catch (e) {
          // Do nothing, proceed
        }
      }

      const found = (allIAMs || []).find((one) => one.resource
        && new RegExp(one.resource).test(req.baseUrl + req.route.path)
        && one.permission === req.method.toLowerCase()
        && !one.excluded);

      if (!found) {
        return res.status(404).json({
          message: 'Not Found',
        });
      }

      if (roles.length <= 1 && (!roles[0] || roles[0] === 'guest')) {
        return res.status(401).json({
          message: 'User is not signed in',
        });
      }

      return res.status(403).json({
        message: 'User is not authorized',
      });
    };
  }

  // Globbing routing files
  config.files.server.iam.forEach((routePath) => {
    // eslint-disable-next-line
    const m = require(resolve(routePath));
    const r = express.Router();
    const exec = regex.exec(routePath);

    // Detect the namespace
    r.use((req, res, next) => {
      if (exec) {
        req.i18n.setDefaultNamespace(`${exec[1]}:${exec[2]}`);
      }

      next();
    });

    // Parse the routes
    if (Array.isArray(m.routes)) {
      m.routes.forEach((route) => {
        if (
          !route
          || typeof route !== 'object'
          || !route.methods
          || typeof route.methods !== 'object'
          || !route.path
        ) {
          console.warn('Invalid route', route);
          return;
        }

        let routeTmp = r.route(route.path);
        let allMiddlwares = route.all || route['*'];

        if (allMiddlwares && !Array.isArray(allMiddlwares)) {
          allMiddlwares = [allMiddlwares];
        }

        if (!Array.isArray(allMiddlwares)) {
          allMiddlwares = [];
        }

        // Add the isAllowed middleware to all subroutes
        allMiddlwares.unshift(isAllowed(iam));

        // Add 'all' middlewares
        routeTmp = routeTmp.all(allMiddlwares);

        // Scan the routes
        Object.keys(route.methods).forEach(async (k) => {
          if (
            typeof routeTmp[k] === 'function'
            && Object.prototype.hasOwnProperty.call(route.methods, k)
            && route.methods[k]
            && typeof route.methods[k] === 'object'
            && route.methods[k].middlewares
          ) {
            const method = route.methods[k];

            try {
              // Add the method middleware
              const { found, reason, data } = await isExcluded(method);
              if (!found) {
                routeTmp[k](method.middlewares);
              } else {
                console.info(chalk.yellow(`
IAM  excluded:
IAM     : ${method.iam}
Reason  : ${reason}
Data    : ${data}
`));
              }
            } catch (e) {
              const routes = method.middlewares.map((middleware) => {
                const result = typeof middleware === 'function' ? '⨍' : 'null';
                return result;
              });
              console.error(`
Error while adding route:

${chalk.red('Route')}   : ${route.path}
${chalk.red('Module')}  : ${routePath}
${chalk.red('Method')}  : ${k}
${chalk.red('Routes')}  : [${routes.join(' , ')}]

Please check your IAM configuraion
`);
              process.exit(1);
            }
          }
        });
      });
    }

    // Add the params middlewares
    if (Array.isArray(m.params)) {
      m.params.forEach((p) => {
        r.param(p.name, p.middleware);
      });
    }

    // Add the router to the app with the prefix
    if (m.is_global === true) {
      app.use(m.prefix, r);
    } else {
      app.use(config.prefix + m.prefix, r);
    }
  });
};
