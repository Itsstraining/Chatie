const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    date: Number,
    content: String,
    conversationId: String,
    senderId: String,
});


module.exports = messageSchema;