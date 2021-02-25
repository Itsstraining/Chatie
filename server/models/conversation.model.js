class ConversationModel {

    /**
     * 
     * @param {String} receiver 
     */
    constructor() {
        this.receiver = [];
        this.messages = [];
        this.file = [];
    }

    constructor(receiver) {
        this.receiver = this.receiver.push(receiver);
        this.messages = [];
        this.file = [];
    }
}


module.exports = ConversationModel;