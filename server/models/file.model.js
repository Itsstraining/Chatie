class FileModel {

    /**
     * 
     * @param {String} nameFile 
     * @param {String} path 
     * @param {String} senderId 
     * @param {String} conversationId 
     * @param {Number} date 
     */
    constructor(conversationId, senderId, nameFile, path, date) {
        this.conversationId = conversationId;
        this.senderId = senderId;
        this.nameFile = nameFile;
        this.path = path;
        this.date = Date.now();

    }
}

module.exports = FileModel;