const server = require('./src/server');
const config = require('./src/config');
<<<<<<< HEAD
const multer = require('multer');
=======
const Database = require('./src/database');

>>>>>>> 3e95b887c22701f31bc3c31a81f08f9e7a66eb7e
const http = require('http').createServer(server);
const io = require('socket.io')(http);


<<<<<<< HEAD
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
=======
const connectionString = 'mongodb+srv://admin:admin@cluster0.9grd8.mongodb.net/chat_DB?retryWrites=true&w=majority'


async function main() {

    await Database.instance.connectToMongoDB(connectionString)
    http.listen(config.PORT, config.HOST, function () {
        console.log(`${config.HOST}:${config.PORT}`);
    })
}

main();


>>>>>>> 3e95b887c22701f31bc3c31a81f08f9e7a66eb7e

server.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(file)
  })

