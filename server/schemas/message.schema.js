const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    date: Date.now(),
    senderId: String,
    content: String,
    conversationId: String,
});


module.exports = messageSchema;