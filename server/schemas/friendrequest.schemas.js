const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    to: String,
    from: String,
    status: Boolean

});

module.exports = friendsSchema;