const server = require('./src/server');
const config = require('./src/config');
const multer = require('multer');
const http = require('http').createServer(server);
const io = require('socket.io')(http);


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })

//port server
http.listen(config.PORT, config.HOST, function () {
    console.log(`${config.HOST}:${config.PORT}`);
});


//Upload file và hình

server.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html');   
});

server.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(file)
  })

