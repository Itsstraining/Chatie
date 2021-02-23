const mongoose = require('mongoose');
const userSchema = require('./user.schemas');


const conversationSchema = new mongoose.Schema({
    sender: userSchema,
    receiver: userSchema,
    message: String,
    listFile:[String],
    Date : Date,
    
});

module.exports = conversationSchema;