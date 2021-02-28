const app = require('express');
const Database = require('../database');

const router = app.Router();

router.post('/', async (req, res) => {
    const {
        senderId,
        receiverId,
        message
    } = req.body;
    try {
        let conver = await Database.instance.Conversation.getAllUserConversation(senderId);
        let existed = 0;
        if (conver != null) {
            for (let i = 0; i < conver.length; i++) {
                for (let j = 0; j < conver[i].receiver.length; i++) {
                    if (receiverId == conver[i].receiver[j]) {
                        existed = 1;
                        res.send({
                            message: "you already talk to this friend"
                        })
                        return;
                    }
                }
            }
        }
        if (existed == 0) {
            //create sender conversation
            let newConSend = await Database.instance.Conversation.createConversation(senderId, receiverId);
            // create receiver conversation
            let newConRec = await Database.instance.Conversation.createConversation(receiverId, senderId);
            let chat = await Database.instance.User.chat(senderId, receiverId, newConSend._id, newConRec._id);
            res.send({
                message: chat,
            })
        }
        console.log("bug")
    } catch (err) {
        res.send({
            message: "Can not send message"
        })
    }

});

router.get('/allUserConver', async (req, res) => {
    const {
        senderId
    } = req.query;
    let allUserConver = await Database.instance.Conversation.getAllUserConversation(senderId);
    res.send({
        allUserConver: allUserConver
    })
})

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

//get all conversation in database
router.get('/', async (req, res) => {
    let conversations = await Database.instance.Conversation.getAllConversation();
    res.send({
        message: conversations,
    })
});

//get one conversation 
router.get('/oneConver', async (req, res) => {
    const {
        senderId,
        receiverId
    } = req.body
    let conversation = await Database.instance.Conversation.getOneConversation(senderId, receiverId);
    res.send({
        conversation: conversation,
    })
});

// router.get('/findreceiver', async (req, res) => {
//     const {
//         receiver
//     } = req.query;
//     let conversation = await Database.instance.Conversation.getOneConversation(receiver);
//     res.send({
//         message: conversation,
//     })
// });

router.put('/', async (req, res) => {
    const {
        senderId,
        receiverId,
        message
    } = req.body;
    try {
        console.log("bug")
        let conversation = await Database.instance.Conversation.updateConversation(senderId, receiverId, message);
        res.send({
            message: conversation
        })
    } catch (err) {
        res.send({
            message: 'can not send messsage'
        })
    }
});

module.exports = router;