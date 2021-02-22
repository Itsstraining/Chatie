const server = require('./src/server');
const config = require('./src/config');

const http = require('http').createServer(server);
const io = require('socket.io')(http);

http.listen(config.PORT, config.HOST, function () {
    console.log(`${config.HOST}:${config.PORT}`);
})


