const server = require('./src/server');
const config = require('./src/config');
const multer = require('multer');
const path = require('path');
const Database = require('./src/database');
const mongoose = require('mongoose');
const httpServer = require('./src/http');
const io = require('./src/socketio')
const cors = require('cors');
const MessageModel = require('./models/message.model');
server.use(cors);

const connectionString = 'mongodb+srv://admin:admin@cluster0.9grd8.mongodb.net/chat_DB?retryWrites=true&w=majority'

// connect socket server with client
io.on('connection', (socket) => {
  console.log('a user is connected');
  socket.on('disconnect', () => {
    console.log('a user disconnected')
  });
  // socket.emit('message-broadcast', 'this is some new data');
  socket.on('message', (msg) => {
    console.log(msg);
    // for(let i = 0; i < msg.conversationId.participants.length; i++){
    //   socket.to(msg.conversationId.participants[i]).emit('message-broadcast', msg.message)
    // }
    socket.broadcast.emit('message-broadcast', msg);
    Database.instance.Conversation.updateConversation(msg.userId, msg.conversationId, msg.message);
  });

  // socket.emit('update-conversation',)
  // socket.on('update-conversation', (data) =>{
  //   socket.emit('update-conversation', data)
  // });

  // socket.on('save-message', function (data) {
  //   console.log(data);
  //   io.emit('new-message', { message: data });
  // });
});



//connect DB
async function main() {
  await Database.instance.connect(connectionString);
  httpServer.listen(config.PORT, config.HOST, function () {
    console.log(`${config.HOST}:${config.PORT}`);
  })
}

main();