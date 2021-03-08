class FileModel {

    /**
     * 
     * @param {String} nameFile 
     * @param {String} path 
     * @param {Number} date 
     * @param {String} senderId
     * @param {String} conversationId
     * 
     */
    constructor(nameFile, path, senderId, conversationId, date) {
        this.nameFile = nameFile;
        this.date = Date.now();
        this.senderId = senderId;
        this.path = path;
        this.conversationId = conversationId;
    }
}

module.exports = FileModel;