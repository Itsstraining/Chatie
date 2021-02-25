const conversationSchema = require('../../schemas/conversation.shemas');
const mongoose = require('mongoose');
const ConversationModel = require('../../models/conversation.model');

class ConversationClass {
    constructor() {
        /**
         * @type{mongoose.Model<any>}
         */
        this.Conversation = mongoose.model('Conversation', conversationSchema);
        this.conversation = new this.Conversation;
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
    async updateConversation(receiver, message) {
        const query = {
            receiver: receiver
        }
        return await this.Conversation.findOneAndUpdate(
            query, {
                messages: this.conversation.messages.push(message)
            })
    }
}


module.exports = ConversationClass;