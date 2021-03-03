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

}

module.exports = MessageClass;