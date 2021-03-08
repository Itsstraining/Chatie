const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
    date: Number,
    nameFile: String,
    path: String,
    senderId: String,
});


module.exports = fileSchema;