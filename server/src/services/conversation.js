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
        return await (this.Conversation.find().sort({date: 1}));
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
    async updateConversation(senderId, conversationId, message) {
        let newMessage = (await this.message.createMessage(new MessageModel(message, conversationId, senderId)))._id;
        await this.Conversation.findOneAndUpdate({
            _id: conversationId
        }, {
            $push: {
                messages: [newMessage]
            }
        });
    }
    
}


module.exports = ConversationClass;