class MessageModel {

    /**
     * 
     * @param {String} message 
     */
    constructor(senderId, content, conversationId) {
        this.senderId = senderId;
        this.content = content;
        this.conversationId = conversationId
        this.date = Date.now();
    }
}

module.exports = MessageModel;