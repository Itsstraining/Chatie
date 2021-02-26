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
     * @param {ConversationModel} newConversation 
     */
    async createConversation(newConversation) {
        return await this.Conversation.create(newConversation);
    }


    //Get all Friend recent
    async getAllConversation() {
        return await this.Conversation.find();
    }

    //Get one friend recent
    async getOneConversation(receiver) {
        return await this.Conversation.findOne({
            receiver: receiver
        });
    }

    /**
     * 
     * @param {*} receiver 
     * @param {String} message 
     */
    async updateConversation(senderId, receiverId, message) {
        const query = {
            sender: senderId,
            receiver: receiverId
        };
        let newMessage =(await this.message.createMessage(new MessageModel(senderId, message, receiverId)))._id ;
        return await this.Conversation.findOneAndUpdate(
            query, {
                $push: {
                    messages: [newMessage]
                }
            })
    }
}


module.exports = ConversationClass;