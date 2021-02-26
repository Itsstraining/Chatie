const app = require('express');
const ConversationModel = require('../../models/conversation.model');
const Database = require('../database');

const router = app.Router();

router.post('/', async (req, res) => {
    const {
        senderId,
        receiverId,
        message
    } = req.body;
    let conver = await Database.instance.Conversation.getOneConversation(senderId, receiverId);
    try {
        if (conver != null) {
            await Database.instance.Conversation.updateConversation(message, conver._id);
            res.send({
                message: conver._id,
            })
        } else {
            let newConver = await Database.instance.Conversation.createConversation(senderId, receiverId);
            let chat = await Database.instance.User.chat(senderId, receiverId, newConver._id);
            res.send({
                message: newConver._id,
                message: chat,
            })
        };
    }catch(err){
        res.send({
            message: "Can not send message"
        })
    }

});

// router.post('/', async (req, res) => {
//     const {
//         sender,
//         receiver
//     } = req.body;
//     let conver = await Database.instance.Conversation.createConversation(new ConversationModel(receiver));
//     res.send({
//         conver: conver,
//     })
// })

router.get('/', async (req, res) => {
    let conversations = await Database.instance.Conversation.getAllConversation();
    res.send({
        message: conversations,
    })
})

router.get('/one', async (req, res) => {
    const {senderId, receiverId} = req.body
    let conversations = await Database.instance.Conversation.getOneConversation(senderId, receiverId);
    res.send({
        message: conversations,
    })
})

router.get('/findreceiver', async (req, res) => {
    const {
        receiver
    } = req.query;
    let conversation = await Database.instance.Conversation.getOneConversation(receiver);
    res.send({
        message: conversation,
    })
})

router.put('/findupdate', async (req, res) => {
    const {
        receiver,
        message
    } = req.body;
    let conversation = await Database.instance.Conversation.updateConversation(receiver, message);
    res.send({
        message: message
    })
})

module.exports = router;