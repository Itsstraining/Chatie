const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email:String,
    userName:String,
    password:String,
    avatar: String,
    friendList: [String],
    conversations: [String],
    status :Boolean,
    friendListRequest: [String]
});

module.exports = userSchema;