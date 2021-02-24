const server = require('./server');
const httpServer = require('./http')

const io = require('socket.io')(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});



module.exports = io;