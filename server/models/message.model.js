class MessageModel {

    /**
     * 
     * @param {String} senderId 
     * @param {String} content 
     * @param {String} conversationId 
     */
    constructor( content, conversationId, senderId) {
        this.content = content;
        this.conversationId = conversationId,
        this.senderId = senderId;
        this.date = Date.now();
    }
}

module.exports = MessageModel;