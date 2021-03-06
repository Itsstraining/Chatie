const app = require('express');
const server = require('../server');
const config = require('../config');
const multer = require('multer');
const path = require('path');
const Database = require('../database');
const mongoose = require('mongoose');
const httpServer = require('../http');
const io = require('../socketio')
// const cors = require('cors');
// const MessageModel = require('./models/message.model');
// const MessageModel = require('../../models/message.model')

const router = app.Router();

// server.use(cors);


//khai báo kho lưu trữ multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({
    storage: storage
  })
  
  
  //Upload file và hình
  
  router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });
  
  router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
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

  module.exports = router;