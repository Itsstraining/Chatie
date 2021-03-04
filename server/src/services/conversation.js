const conversationSchema = require('../../schemas/conversation.shemas');
const mongoose = require('mongoose');
const ConversationModel = require('../../models/conversation.model');
const MessageClass = require('./message');
const MessageModel = require('../../models/message.model');
class ConversationClass {
    constructor() {
        /**
         * @type {mongoose.Model<any>}
         */
        this.Conversation = mongoose.model('Conversation', conversationSchema);
        this.conversation = new this.Conversation;
        this.message = new MessageClass();
    }

    /**
     * 
     * 
     */
    async createConversation(senderID, receiverID) {
        let newConver = await this.Conversation.create({
            ...conversationSchema
        });
        return this.Conversation.findOneAndUpdate({
            _id: newConver._id
        }, {
            $push: {
                participants: [senderID, receiverID]
            }
        })
    }

    async createChatGroup() {

    }


    //Get all conversation 
    async getAllConversation() {
        return await this.Conversation.find();
    }


    //Get one friend recent
    async getOneConversation(conversationId) {
        return await this.Conversation.findOne({
            _id: conversationId
        });
    }

    /**
     * 
     * @param {*} receiverId 
     * @param {String} message 
     */
<<<<<<< HEAD
    async updateConversation(senderId, receiverId, message, date) {
        let convers = await this.getAllUserConversation(senderId);
        let conversationId = '';
        for(let i = 0; i < convers.length; i++){
            for(let j = 0; j < convers[i].receiver.length; j++){
                if(receiverId == convers[i].receiver[j]){
                    conversationId = convers[i]._id;
                }
            }
        }
        let newMessage =(await this.message.createMessage(new MessageModel(message, conversationId, senderId, date)))._id ;
        return await this.Conversation.findOneAndUpdate(
            {_id: conversationId}, {
                $push: {
                    messages: [newMessage]
                }
            })
=======
    async updateConversation(senderId, conversationId, message) {
        let newMessage = (await this.message.createMessage(new MessageModel(message, conversationId, senderId)))._id;
        await this.Conversation.findOneAndUpdate({
            _id: conversationId
        }, {
            $push: {
                messages: [newMessage]
            }
        });
>>>>>>> 33217856777a92f8d1001dcd69aa592aa63ba4ca
    }
}


module.exports = ConversationClass;