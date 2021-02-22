const server = require('./src/server');
const config = require('./src/config');
const Database = require('./src/database');

const http = require('http').createServer(server);
const io = require('socket.io')(http);


const connectionString = 'mongodb+srv://admin:admin@cluster0.9grd8.mongodb.net/chat_DB?retryWrites=true&w=majority'


async function main() {

    await Database.instance.connectToMongoDB(connectionString)
    http.listen(config.PORT, config.HOST, function () {
        console.log(`${config.HOST}:${config.PORT}`);
    })
}

main();




