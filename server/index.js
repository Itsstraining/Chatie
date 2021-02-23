const server = require('./src/server');
const config = require('./src/config');
const multer = require('multer');
const path = require('path');
const Database = require('./src/database');
const mongoose = require('mongoose');
const http = require('http').createServer(server);
const io = require('socket.io')(http);


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





