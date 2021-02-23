
// const server = require('./src/server');
// const config = require('./src/config');
// const Database = require('./src/database');
// const SocketIo = require('./src/socketio');

// const socket = new SocketIo();

// const http = require('http').createServer(server);
// // const io = require('socket.io')(http);


// const connectionString = 'mongodb+srv://admin:admin@cluster0.9grd8.mongodb.net/chat_DB?retryWrites=true&w=majority'


// async function main() {
//     // await Database.instance.connectToMongoDB(connectionString);
//     try {
//         socket.connectToSocket();
//         http.listen(config.PORT, config.HOST, function () {
//             console.log(`${config.HOST}:${config.PORT}`);
//         });
//     }catch(err){
//         console.log('bug');
//     }
// }

// main();

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);




app.get('/', (request, response) => {
    response.send("hello world")
})

io.on('connection', (socket) => {
    console.log('a user is connected');
    socket.on('disconnect', () => {
        console.log('a user is disconnected')
    })
})


io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});




http.listen(9999, '0.0.0.0', function () {
    console.log('9999');
})

