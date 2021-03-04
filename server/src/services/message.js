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
        })).content;
    }

    // async getMessageByTime(from, to) {
    //     let from = Date.now();
    //     let to = Date.now() - (30*6000);
    //     return await this.Message.find({date: {$lte: from, $gte: to}});
    // }

}

module.exports = MessageClass;