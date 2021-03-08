const express = require('express');
const cors =require('cors')
const server = express();
const Database = require('./database');
const bodyParser = require('body-parser');
const ConversationModel = require('../models/conversation.model');
const User = require('../models/user.model');
const MessageModel = require('../models/message.model');
server.use(cors());
server.use(bodyParser.json());
const multer = require('multer');
const path = require('path');

server.use("/conversation", require('./router/conversation.router'));
server.use("/user", require('./router/user.router'));
server.use("/mess", require('./router/message.router'));
server.use("/friend", require('./router/friend.router'));
server.use("/file", require('./router/file.router'));
// server.use("/upload", require('./router/upload.router'));






 //khai báo kho lưu trữ multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage });
  
  

  //Upload file và hình
  server.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });
  
  server.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file;
    console.log(file);
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(file, {
      msg: 'File upload!',
      file: `uploads/${req.file.fieldname}`
    });
  });

  //Uploading multiple files
  server.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
  const files = req.files
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(files)
})


// server.post('/uploadphoto', upload.single('picture'), (req, res) => {
//   var img = fs.readFileSync(req.file.path);
//   var encode_image = img.toString('base64');
//   // Define a JSONobject for the image attributes for saving to database

//   var finalImg = {
//     contentType: req.file.mimetype,
//     image:  new Buffer(encode_image, 'base64')
//   };
//   db.collection('quotes').insertOne(finalImg, (err, result) => {
//     console.log(result)

//     if (err) return console.log(err)

//     console.log('saved to database')
//     res.redirect('/')
//   })
// })


module.exports = server;