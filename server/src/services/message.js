const mongoose = require('mongoose');
const MessageModel = require('../../models/message.model');
const messageSchema = require('../../schemas/message.schema');


class MessageClass {


    constructor() {
        /**
         * @type {mongoose.Model<any>}
         */
        this.Message = new mongoose.model("Message", messageSchema);
    }

    /**
     * 
     * @param {MessageModel} newMessage 
     */
    async createMessage(newMessage) {
        return await this.Message.create(newMessage)
    }

    async getAllMessage() {
        return await this.Message.find();
    }

    async getMessageByID(id) {
        return (await this.Message.findOne({
            _id: id,
        }));
    }

    async getAllMessageByConverId(conversationId){
        return await this.Message.find({
            conversationId: conversationId
        }, null,{sort: {date: -1}, limit: 30});
    }

    async deleteConverMessages(conversationId){
        await this.Message.deleteMany({conversationId: conversationId});
    }
}

module.exports = MessageClass;