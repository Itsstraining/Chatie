const express = require('express');
const app = express();
const bodyParser = require('body-parser')
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

let tempUser = {};

// connect socket server with client
io.on('connection', (socket) => {
  console.log('a user is connected');
  // socket.on('emit-account', (account) => {
  //   console.log(account);
  //   console.log(socket.id);
  //   tempUser[account] = {
  //     sId: socket.id
  //   };
  //   console.log(tempUser);
  //   socket.on('message', (msg) => {
  //     let receiversId;
  //     receiversId = tempUser[msg.receiverId].sId
  //     socket.to(receiversId).emit('message-broadcast', msg);
  //     Database.instance.Conversation.updateConversation(msg.userId, msg.conversationId, msg.message);
  //     Database.instance.User.sortRecentConver(msg.userId, msg.conversationId);
  //     Database.instance.User.sortRecentConver(msg.receiverId, msg.conversationId);
  //   });

  //   socket.on('add-friend', (data) => {
  //     console.log(data)
  //     // let receiver_sId = tempUser[data].sId;
  //     // console.log(receiver_sId)
  //     socket.broadcast.emit('friend-request', data)
  //   })
  // });


  socket.on('disconnect', () => {
    console.log('a user disconnected')
  });

  socket.on('message', (msg) => {
    socket.broadcast.emit('message-broadcast', msg);
    Database.instance.Conversation.updateConversation(msg.userId, msg.conversationId, msg.message, msg.type);
    Database.instance.User.sortRecentConver(msg.userId, msg.conversationId);
    Database.instance.User.sortRecentConver(msg.receiverId, msg.conversationId);
  });

  socket.on('add-friend', (data) => {
    console.log(data)
    // let receiver_sId = tempUser[data].sId;
    // console.log(receiver_sId)
    socket.broadcast.emit('friend-request', data)
  })

  // socket.emit('message-broadcast', 'this is some new data');


  // socket.emit('update-conversation',)
  // socket.on('update-conversation', (data) =>{
  //   socket.emit('update-conversation', data)
  // });

  // socket.on('save-message', function (data) {
  //   console.log(data);
  //   io.emit('new-message', { message: data });
  // });
});



//khai báo kho lưu trữ multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage: storage })


// //Upload file và hình

// server.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

// server.get('/hi', function (req, res) {
//   res.send('HI')
// })

// server.post('/uploadfile', upload.single('myFile'), (req, res,next) => {
//   const file = req.file;
//   console.log(file);
//   if(!file)
//   {
//     const error = new Error("Please upload a file");
//     error.httpStatusCode=400;
//     return next(error);
//   }
//   res.send(file , {
//     msg: 'File upload!',
//     file: `/uploads/${req.file.fieldname}`
//   });
// });



//connect DB
async function main() {
  await Database.instance.connect(connectionString);
  httpServer.listen(config.PORT, config.HOST, function () {
    console.log(`${config.HOST}:${config.PORT}`);
  })
}

main();