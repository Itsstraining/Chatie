
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


const server = require('./src/server');
const config = require('./src/config');
const multer = require('multer');
const path = require('path');
const Database = require('./src/database');
const mongoose = require('mongoose');
const http = require('http').createServer(server);
const io = require('socket.io')(http);



// server.get('/', (request, response) => {
//     response.send("hello world")
// })

// io.on('connection', (socket) => {
//     console.log('a user is connected');
//     socket.on('disconnect', () => {
//         console.log('a user is disconnected')
//     })
// })


// io.on('connection', (socket) => {
//     socket.broadcast.emit('hi');
// });

// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//     });
// });




// const connectionString = 'mongodb+srv://admin:admin@cluster0.9grd8.mongodb.net/chat_DB?retryWrites=true&w=majority'


//connect DB
async function main() {
  await Database.instance.connect("mongodb+srv://admin:admin@cluster0.9grd8.mongodb.net/chat_DB?retryWrites=true&w=majority");
  http.listen(config.PORT, config.HOST, function () {
    console.log(`${config.HOST}:${config.PORT}`);
  })
}



//khai báo kho lưu trữ multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage })


//Upload file và hình

server.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.post('/uploadfile', upload.single('myFile'), (req, res,next) => {
  const file = req.file;
  console.log(file);
  if(!file)
  {
    const error = new Error("Please upload a file");
    error.httpStatusCode=400;
    return next(error);
  }
  res.send(file , {
    msg: 'File upload!',
    file: `uploads/${req.file.fieldname}`
  });
});
  
main();