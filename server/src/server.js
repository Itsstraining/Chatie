const express = require('express');
const server = express();
const Database = require('./database');
const bodyParser = require('body-parser');
const ConversationModel = require('../models/conversation.model');
const User = require('../models/user.model');
const MessageModel = require('../models/message.model');

server.use(bodyParser.json());


server.use("/conversation", require('./router/conversation.router'));
server.use("/user", require('./router/user.router'));
server.use("/mess", require('./router/message.router'));
server.use("/", require('./router/friend.router'));


module.exports = server;