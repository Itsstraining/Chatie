const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email:String,
    displayname:String,
    avatar: String,
    friendList: [String]
});

module.exports = userSchema;