const http = require('http');
const createApplication = require('./app');

function createServer() {
  const app = createApplication();
  const server = http.createServer(app);
  return server;
}

module.exports = createServer;