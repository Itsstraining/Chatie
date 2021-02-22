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



server.post('/uploadphoto', upload.single('picture'), (req, res) => {
  let img = fs.readFileSync(req.file.path);
  let encode_image = img.toString('base64');
  // Define a JSONobject for the image attributes for saving to database

  let finalImg = {
    contentType: req.file.mimetype,
    image:  new Buffer(encode_image, 'base64')
  };
  db.collection('quotes').insertOne(finalImg, (err, result) => {
    console.log(result)

    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

