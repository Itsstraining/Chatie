const app = require('express');
const Database = require('../database');

const router = app.Router();

router.post("/", (req, res) => {
    const {
        senderId,
        message,
        conversationId
    } = req.body;
    try {
        let newMessage = Database.instance.Message.createMessage(new MessageModel(senderId, message, conversationId));
        res.send('Messsage has been created')
    } catch (error) {
        res.send('Message has not been created')

    }
});

router.get("/", async (req, res) => {
    let getMessage = await Database.instance.Message.getAllMessage();
    res.send({
        getMess: getMessage,
    })
});

router.get("/getMessageID", async (req, res) => {
    const{id} = req.query;
    try {
        let messageID = await Database.instance.Message.getMessageByID(id);
        res.send({ content: messageID})
    } catch (error) {
        res.send('err')
    }
});

router.get("/getAllMessageId", async (req, res) => {
    const {conversationId} = req.query;
    try{
        let messageContent = await Database.instance.Message.getAllMessageByConverId(conversationId);
        res.send({
            messageContent: messageContent,
        });
    }catch(err){
        res.send(err)
    }
})

module.exports = router;