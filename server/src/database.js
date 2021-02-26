const mongoose = require('mongoose');
const userSchema = require('../schemas/user.schemas');
const fileSchema = require('../schemas/file.schemas');

const MessageClass = require('./services/message');
const ConversationClass = require('./services/conversation');
const User = require('../models/user.model');
class Database {
    /**
     * @type {Database}
     */
    static _cache = null;

    constructor() {
        /**
         * @type{mongoose.Model<any>}
         */
        this.User = new mongoose.model("User", userSchema);
        this.fileSchema = new mongoose.model("files", fileSchema);
        this.Conversation = new ConversationClass();
        this.Message = new MessageClass();
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

    /**
     * @param {User} newUser
     */
    async createUser(newUser) {
        return await this.User.create(newUser);
    }
    async getUser() {
        return await this.User.find();
    }
    /**
     * 
     * @param {String} email 
     * @param {String} displayname 
     * @param {String} avatar 
     * @param {Boolean} status 
     */
    async getUserMailandupdate(email, displayname, avatar, status) {
        return await this.User.findOneAndUpdate({ email: email }, {
            displayname: displayname,
            avatar: avatar,
            status: status
        });
    }
    async getUserMail(email) {
        return await this.User.findOne({ email });
    }

    async getId(id) {
        return await this.User.findOne({ _id: id });
    }

    async deleteUser(id) {
        console.log(id)
        await this.User.findOneAndDelete({ _id: id });
    }

    /**
     * 
     * @param {String} id 
     * @param {String} friendId 
     * 
     */
    async addFriend(id, friendId) {
        // Optional. Use this if you create a lot of connections and don't want
        // to copy/paste `{ useNewUrlParser: true }`.
        mongoose.set('useNewUrlParser', true);
        let user = await this.getId(id);
        for (let i = 0; i < user.friendList.length; i++) {
            if (friendId == user.friendList[i]) {
                return 'Already be friend';
            }
        }
        // user.friendList.push(friendId);
        await this.User.updateOne({ _id: id }, { $push: { friendList: [friendId] } });
        return 'Friends'
    }

    /**
     * 
     * @param {String} id 
     * @param {String} friendId 
     * 
     */
    async DeleteFriend(id, friendId) {
        // Optional. Use this if you create a lot of connections and don't want
        // to copy/paste `{ useNewUrlParser: true }`.
        mongoose.set('useNewUrlParser', true);
        await this.User.updateOne({ _id: id }, { $pull: { friendList: { $in: [friendId] } } });
        return 'Deleted'
    }
    async Login(email) {
        mongoose.set('useNewUrlParser', true);
        let user = await this.getUser()();
        for (let i = 0; i < user.length; i++) {
            if (email == user.length[i]) {
                return 'Already have account';
            }
        }
        await this.User.updateOne({ email: email }, { $push: { User } });
    }



}



module.exports = Database;