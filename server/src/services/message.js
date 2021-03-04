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
<<<<<<< HEAD
        })).content;
    }

    // async getMessageByTime(from, to) {
    //     let from = Date.now();
    //     let to = Date.now() - (30*6000);
    //     return await this.Message.find({date: {$lte: from, $gte: to}});
    // }

=======
        }));
    }

    async getAllMessageByConverId(conversationId){
        return await this.Message.find({
            conversationId: conversationId
        }, null,{sort: {date: -1}, limit: 30});
    }
>>>>>>> 33217856777a92f8d1001dcd69aa592aa63ba4ca
}

module.exports = MessageClass;