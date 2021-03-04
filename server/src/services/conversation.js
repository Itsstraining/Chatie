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
            senderId: senderID,
            receiver: [receiverID],
            ...conversationSchema
        });
    }

    async createChatGroup(){

    }


    //Get all conversation 
    async getAllConversation() {
        return await this.Conversation.find();
    }

    //Get all conversation 
    async getAllUserConversation(senderId) {
        const changeStream = this.Conversation.watch().on('change', change => console.log(change));
        return (await this.Conversation.find({senderId: senderId}));
    }

    //Get one friend recent
    async getOneConversation(senderId, receiverId) {
        return await this.Conversation.findOne({
            senderId: senderId,
            receiver: { $elemMatch: {$eq: receiverId} } 
        });
    }

    /**
     * 
     * @param {*} receiverId 
     * @param {String} message 
     */
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
    }
}


module.exports = ConversationClass;