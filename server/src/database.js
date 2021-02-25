const mongoose = require('mongoose');
const userSchema = require('../schemas/user.schemas');
const fileSchema = require('../schemas/file.schemas');
const conversationSchema = require('../schemas/conversation.shemas');
const User = require('../models/user.model');
class Database {
    /**
     * @type {Database}
     */
    static _cache = null;

    constructor(connectionString)
    {
        /**
         * @type{String}
         */
        this.connectionString = connectionString;
        /**
         * @type{mongoose.Model<any>}
         */
        this.User = new mongoose.model("User",userSchema);
        this.fileSchema = new mongoose.model("files",fileSchema);
        this.conversationSchema = new mongoose.model('conversation',conversationSchema);
    }

    /**
     * @returns {Database}
     */
    static get instance()
    {
        if(this._cache == null){
            this._cache = new Database("");
        }
        return this._cache;
    }



    /**
     * @returns {Promise<mongoose.Connection>}
     */
    async connect(connectionString)
    {
        
        return new Promise((resolve,reject)=>
        {
            mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
            const connection = mongoose.connection;
            connection.on("error",(err)=>{
                reject(err);
            });
            connection.once("open",()=>{
                console.log("Connect successfully")
                resolve(connection);
            });
        });
    }
    
    /**
     * @param {User} newUser
     */
    async createUser(newUser)
    {
       return await this.User.create(newUser);
    }
    async getUserMail(email)
    {
        return await this.User.find();
    }
    /**
     * 
     * @param {String} email 
     * @param {String} displayname 
     * @param {String} avatar 
     * @param {Boolean} status 
     */
    async getUserMailandupdate(email,displayname , avatar , status)
    {
        return await this.User.findOneAndUpdate({email: email}, {
            displayname: displayname,
            avatar: avatar,
            status:status
        });
    }
}



module.exports = Database;