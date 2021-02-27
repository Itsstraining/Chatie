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
    const{id} = req.body;
    try {
        let messageID = await Database.instance.Message.getMessageByID(id);
        console.log(messageID)
        res.send({ content: messageID})
    } catch (error) {
        res.send('err')
    }
});

module.exports = router;