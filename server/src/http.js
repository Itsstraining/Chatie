const server = require('./server');
const http = require('http');
let httpServer = http.createServer(server);

module.exports = httpServer;