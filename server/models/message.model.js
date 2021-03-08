class MessageModel {

    /**
     * 
     * @param {String} senderId 
     * @param {String} content 
     * @param {String} conversationId
     * @param {Number} date
    * @param {String} type

     */
    constructor(content, conversationId, senderId,type) {
        this.content = content;
        this.conversationId = conversationId,
            this.senderId = senderId;
        this.date = Date.now();
        this.type = type
    }
}

module.exports = MessageModel;