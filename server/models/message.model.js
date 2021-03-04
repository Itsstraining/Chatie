class MessageModel {

    /**
     * 
     * @param {String} senderId 
     * @param {String} content 
     * @param {String} conversationId 
     * @param {Number} date
     */
<<<<<<< HEAD
    constructor( content, conversationId, senderId, date) {
=======
    constructor(content, conversationId, senderId) {
>>>>>>> 33217856777a92f8d1001dcd69aa592aa63ba4ca
        this.content = content;
        this.conversationId = conversationId,
        this.senderId = senderId;
        this.date = Date.now();
    }
}

module.exports = MessageModel;