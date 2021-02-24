const mongoose = require('mongoose');
const userSchema = require('../schemas/user.schemas');
const fileSchema = require('../schemas/file.schemas');
const conversationSchema = require('../schemas/conversation.shemas');
const user = require('../models/user.model');
class Database {
    /**
     * @type {Database}
     */
    static _cache = null;

    constructor() {
        /**
         * @type{mongoose.Model<any>}
         */
        this.userSchema = new mongoose.model("users", userSchema);
        this.fileSchema = new mongoose.model("files", fileSchema);
        this.conversationSchema = new mongoose.model('conversation', conversationSchema);
    }

    /**
     * @returns {Database}
     */
    static get instance() {
        if (this._cache == null) {
            this._cache = new Database("");
        }
        return this._cache;
    }

    /**
     * @returns {Promise<mongoose.Connection>}
     */
    async connect(connectionString) {

        return new Promise((resolve, reject) => {
            mongoose.connect(connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            const connection = mongoose.connection;
            connection.on("error", (err) => {
                reject(err);
            });
            connection.once("open", () => {
                console.log("Connect to database successfully")
                resolve(connection);
            });
        });
    }

}



module.exports = Database;