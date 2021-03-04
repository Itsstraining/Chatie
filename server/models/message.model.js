class MessageModel {

    /**
     * 
     * @param {String} senderId 
     * @param {String} content 
     * @param {String} conversationId 
     * @param {Number} date
     */
    constructor( content, conversationId, senderId, date) {
        this.content = content;
        this.conversationId = conversationId,
        this.senderId = senderId;
        this.date = Date.now();
    }
}

module.exports = MessageModel;