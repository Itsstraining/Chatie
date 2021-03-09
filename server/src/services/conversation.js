const conversationSchema = require('../../schemas/conversation.shemas');
const mongoose = require('mongoose');
const ConversationModel = require('../../models/conversation.model');
const MessageClass = require('./message');
const MessageModel = require('../../models/message.model');
const FileClass = require('./file');
const FileModel = require('../../models/file.model');
class ConversationClass {
    constructor() {
        /**
         * @type {mongoose.Model<any>}
         */
        this.Conversation = mongoose.model('Conversation', conversationSchema);
        this.conversation = new this.Conversation;
        this.message = new MessageClass();
        this.file = new FileClass();
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
                participants: { $each: [ senderID, receiverID ]}
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
    async updateConversation(senderId, conversationId, message, type) {
        let newMessage = (await this.message.createMessage(new MessageModel(message, conversationId, senderId,type)))._id;
        await this.Conversation.findOneAndUpdate({
            _id: conversationId
        }, {
            $push: {
                messages: [newMessage]
            }
        });
    }

    /**
     * 
     * @param {*} receiverId 
     * @param {String} file 
     */
     async updateFileConversation(conversationId, senderId, nameFile, path) {
        let newFile = (await this.file.createFile(new FileModel(conversationId, senderId, nameFile, path)))._id;
        return await this.Conversation.findOneAndUpdate({
            _id: conversationId
        }, {
            $push: {
                listFile: [newFile]
            }
        });
    }

    async deleteConversation(conversationId){
        await this.Conversation.deleteOne({_id: conversationId});
        await this.message.deleteConverMessages(conversationId);
    }
    
}


module.exports = ConversationClass;