const server = require('./server');

const http = require('http').createServer(server);
const io = require('socket.io')(http);

class SocketIo {
    connectToSocket() {
        try{
            io.on('connection', (socket) => {
                console.log('a user is connected');
                socket.on('disconnect', () => {
                    console.log('a user is disconnected')
                })
            })
        }catch(err){
            console.log("bug");
        }
        

        // io.on('connection', (socket) => {
        //     socket.broadcast.emit('hi');
        // });

        // io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

        // io.on('connection', (socket) => {
        //     socket.on('chat message', (msg) => {
        //         io.emit('chat message', msg);
        //     });
        // });
    }
}

module.exports = SocketIo;