const mongoose = require('mongoose');
const fileSchema = require('./file.schemas');
const messageSchema = require('./message.schema');
const userSchema = require('./user.schemas');


const conversationSchema = new mongoose.Schema({
    participants: [String],
    messages: [String],
    listFile: [fileSchema],
});

module.exports = conversationSchema;