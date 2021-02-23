const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
    Date: Date,
    path: String,

});

module.exports = fileSchema;