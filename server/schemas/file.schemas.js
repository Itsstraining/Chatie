const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
    conversationId: String,
    senderId: String,
    nameFile: String,
    path: String,
    date: Number,


    
});


module.exports = fileSchema;