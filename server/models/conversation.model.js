class ConversationModel {

    /**
     * 
     * @param {String} senderId 
     * @param {String} receiverId
     */
    constructor(senderId, receiverId) {
        this.participants.push(senderId,receiverId);
        this.messages = [];
        this.file = [];
    }

}


module.exports = ConversationModel;