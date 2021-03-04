const app = require('express');
const Database = require('../database');
const MessageModel = require('../../models/message.model')

const router = app.Router();

router.post("/", async (req, res) => {
    const {
        senderId,
        message,
        conversationId,
        date
    } = req.body;
    try {
        // res.send({senderId:senderId,
        //     message:message,
        //     conversationId:conversationId,
        //     date:date})
        let newMessage = await Database.instance.Message.createMessage(new MessageModel(senderId, message, conversationId, date));
        res.send('Messsage has been created')
    } catch (error) {
        res.send('Message has not been created')

    }
});

// router.get("/loadMessage", async (req, res) => {
//     const {
//         dateFrom,
//         dateTo
//     } = req.query;
//     let loadMessage = [];
//     if (dateFrom != undefined || dateTo != undefined) {
//         dateFrom = dateFrom == undefined ? 0 : dateFrom;
//         dateTo = dateTo == undefined ? dateFrom : dateTo;
//         let loadMessage = await Database.instance.Message.getMessageByTime(dateFrom, dateTo);
//         res.send({loadMessage : loadMessage});
//         return;
//     }
// })

router.get("/", async (req, res) => {
    let getMessage = await Database.instance.Message.getAllMessage();
    res.send({
        getMess: getMessage,
    })
});

router.get("/getMessageID", async (req, res) => {
<<<<<<< HEAD
    const {
        id
    } = req.body;
    try {
        let messageID = await Database.instance.Message.getMessageByID(id);
        console.log(messageID)
        res.send({
            content: messageID
        })
=======
    const{id} = req.query;
    try {
        let messageID = await Database.instance.Message.getMessageByID(id);
        res.send({ content: messageID})
>>>>>>> 33217856777a92f8d1001dcd69aa592aa63ba4ca
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