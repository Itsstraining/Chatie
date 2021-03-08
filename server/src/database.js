const mongoose = require('mongoose');
const fileSchema = require('../schemas/file.schemas');

const MessageClass = require('./services/message');
const ConversationClass = require('./services/conversation');
const UserClass = require("../src/services/user");
const FileClass = require('./services/file');





class Database {
    /**
     * @type {Database}
     */
    static _cache = null;

    constructor() {
        
        this.fileSchema = new mongoose.model("files", fileSchema);
        this.Conversation = new ConversationClass();
        this.Message = new MessageClass();
        this.User = new UserClass();
        this.File = new FileClass();
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