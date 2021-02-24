class ConversationModel {

    /**
     * 
     * @param {String} sender 
     * @param {String} receiver 
     */
    constructor(sender, receiver) {
        this.sender = sender;
        this.receiver = receiver;
        this.messages = [];
        this.file = [];
    }
}


module.exports = ConversationModel;