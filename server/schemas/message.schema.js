const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    date: Date,
    content: String,
    conversationId: String,
});


module.exports = messageSchema;