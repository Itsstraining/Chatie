const server = require('./src/server');
const config = require('./src/config');
const multer = require('multer');
const Database = require('./src/database');

const http = require('http').createServer(server);
const io = require('socket.io')(http);


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

let upload = multer({ storage: storage })



//Upload file và hình

server.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
const connectionString = 'mongodb+srv://admin:admin@cluster0.9grd8.mongodb.net/chat_DB?retryWrites=true&w=majority'


async function main() {

  await Database.instance.connectToMongoDB(connectionString)
  http.listen(config.PORT, config.HOST, function () {
    console.log(`${config.HOST}:${config.PORT}`);
  })
}

main();



server.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file)
})

