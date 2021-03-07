// const app = require('express');
const multer = require('multer');
const path = require('path');
const server = require('../server');
const bodyParser = require('body-parser');
const router = app.Router();
// const Database = require('../database');
// const mongoose = require('mongoose');
// const httpServer = require('../http');
// const io = require('../socketio')
// const cors = require('cors');
// const MessageModel = require('./models/message.model');
// const MessageModel = require('../../models/message.model')
// server.use(cors);




// //CREATE EXPRESS APP
// router.use(bodyParser.urlencoded({extended: true}))
 
// //ROUTES WILL GO HERE
// router.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html');   
// });

// // SET STORAGE
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
 
// var upload = multer({ storage: storage })


// router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//   const file = req.file
//   if (!file) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//   res.send(file)
// })

// //Uploading multiple files
// router.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
//   const files = req.files
//   if (!files) {
//     const error = new Error('Please choose files')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//   res.send(files)
// })


// router.post('/uploadphoto', upload.single('picture'), (req, res) => {
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





  module.exports = router;









  // //khai báo kho lưu trữ multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
//   });
//   const upload = multer({ storage: storage });
  
//   router.get('/hi', (req, res) => {
//       res.send('Hello!')
//   });


//   //Upload file và hình
//   router.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
//   });
  
//   router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//     const file = req.file;
//     console.log(file);
//     if (!file) {
//       const error = new Error("Please upload a file");
//       error.httpStatusCode = 400;
//       return next(error);
//     }
//     res.send(file, {
//       msg: 'File upload!',
//       file: `uploads/${req.file.fieldname}`
//     });
//   });