const mongoose = require('mongoose');
const FileModel = require('../../models/file.model');
const fileSchema = require('../../schemas/file.schemas');


class FileClass {


    constructor() {
        /**
         * @type {mongoose.Model<any>}
         */
        this.File = new mongoose.model("File", fileSchema);
    }

    /**
     * 
     * @param {FileModel} newFile 
     */
    async createFile(newFile) {
        return await this.File.create(newFile)
    }

    async getAllFile() {
        return await this.File.find();
    }

    async getFileByID(id) {
        return (await this.File.findOne({
            _id: id,
        }));
    }

    async getAllFileByConverId(conversationId){
        return await this.File.find({
            conversationId: conversationId
        })
    }
}

module.exports = FileClass;