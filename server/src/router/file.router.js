const app = require('express');
const Database = require('../database');
const FileModel = require('../../models/file.model')

const router = app.Router();

router.post("/", async (req, res) => {
    const {
        senderId,
        path,
        conversationId,
        date
    } = req.body;
    try {
        let newFile = await Database.instance.File.createFile(new FileModel(senderId, path, conversationId, date));
        res.send('File has been created')
    } catch (error) {
        res.send('File has not been created')

    }
});


router.get("/", async (req, res) => {
    let getFile = await Database.instance.File.getAllFile();
    res.send({
        getFile: getFile,
    })
});

router.get("/getFileID", async (req, res) => {
    const{id} = req.query;
    try {
        let fileID = await Database.instance.File.getFileByID(id);
        res.send({ content: fileID})
    } catch (error) {
        res.send('err')
    }
});

router.get("/getAllFileId", async (req, res) => {
    const {conversationId} = req.query;
    try{
        let fileContent = await Database.instance.File.getAllFileByConverId(conversationId);
        res.send({
            fileContent: fileContent,
        });
    }catch(err){
        res.send(err)
    }
})

module.exports = router;