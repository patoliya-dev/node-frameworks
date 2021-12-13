'use strict';
/* Hapi demo app2 */
const Hapi = require('@hapi/hapi');
require('./models/index');

const init = async () => {
    const server = await Hapi.server({
        port: 3000,
        host: 'localhost',
      });
      
      await server.register({
          plugin: require('hapi-router'),
          options: {
            routes: './routes/**/*.js'
          }
      });
  
      await server.start();
      console.log('Server running on %s', server.info.uri);
};
init();
