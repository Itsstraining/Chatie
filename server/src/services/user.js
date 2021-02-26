const mongoose = require('mongoose');
const UserModel = require('../../models/user.model');
const userSchema = require('../../schemas/user.schemas');
const ConversationClass = require('../services/conversation');

class UserClass {
    constructor(){
        /**
         * @type {mongoose.Model<any>}
         */
        this.User = new mongoose.model("User", userSchema);
        this.Conversation = new ConversationClass();
    }

     /**
     * @param {UserModel} newUser
     */
    async createUser(newUser) {
        return await this.User.create(newUser);
    }

    async getAllUser() {
        return await this.User.find();
    }

    async getUserByEmail(email) {
        return await this.User.findOne({email: email});
    }

    /**
     * 
     * @param {String} email 
     * @param {String} displayname 
     * @param {String} avatar 
     * @param {Boolean} status 
     */
    async updateProfile(id, email, displayname , avatar , status)
    {
        return await this.User.findOneAndUpdate({_id: id}, {
            email: email,
            displayname: displayname,
            avatar: avatar,
            status:status
        });
    }

    async chat(id, receiverId, conversationId){
        await this.User.findOneAndUpdate(
            {_id: id}, {
                $push: {
                    conversations: [conversationId]
                }
            });
        let conver = this.Conversation.createConversation(receiverId)
        await this.User.findOneAndUpdate(
            {_id: receiverId}, {
                $push: {
                    conversations: [conversationId]
                }
            });
        return 'You two are chatting'
    }

    async deleteUser(email){
        await this.User.findOneAndDelete({email: email});
    }

}

module.exports = UserClass;