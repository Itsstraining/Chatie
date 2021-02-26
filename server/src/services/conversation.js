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
        return await this.Conversation.create({
            sender: senderID,
            receiver: [receiverID],
            ...conversationSchema
        });
    }

    async createChatGroup(){

    }


    //Get all Friend recent
    async getAllConversation() {
        return await this.Conversation.find();
    }

    //Get one friend recent
    async getOneConversation(senderId, receiverId) {
        return await this.Conversation.findOne({
            sender: senderId,
            receiver: { $elemMatch: {$eq: receiverId} } 
        });
    }

    /**
     * 
     * @param {*} receiverId 
     * @param {String} message 
     */
    async updateConversation(message, conversationId) {
        let newMessage =(await this.message.createMessage(new MessageModel(message, conversationId)))._id ;
        return await this.Conversation.findOneAndUpdate(
            {_id: conversationId}, {
                $push: {
                    messages: [newMessage]
                }
            })
    }
}


module.exports = ConversationClass;