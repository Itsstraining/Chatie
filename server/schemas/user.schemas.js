const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email:String,
    userName:String,
    password:String,
    avatar: String,
    friendList: [String],
    friendListRequest: [String],
    conversations: [String],
    status :Boolean,
});

module.exports = userSchema;