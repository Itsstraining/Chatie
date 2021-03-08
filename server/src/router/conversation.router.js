const app = require('express');
const Database = require('../database');
const router = app.Router();

router.post('/', async (req, res) => {
    const {
        senderId,
        receiverId
    } = req.body;
    try {
        let conver = await Database.instance.User.getAllUserConversation(senderId);
        let existed = 0;
        if (conver) {
            for (let i = 0; i < conver.length; i++) {
                let temp = await Database.instance.Conversation.getOneConversation(conver[i])
                for (let j = 0; j < temp.participants.length; j++) {
                    if (receiverId == temp.participants[j]) {
                        existed = 1;
                        res.send({
                            message: "you already talk to this friend"
                        })
                        return;
                    }
                }
            }
        }

        //create conversation
        let newConversation = await Database.instance.Conversation.createConversation(senderId, receiverId);
        let chat = await Database.instance.User.chat(senderId, receiverId, newConversation._id);
        res.send({
            message: chat,
        })

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
    let allUserConver = await Database.instance.User.getAllUserConversation(senderId);
    res.send({
        allUserConver: allUserConver
    })
})

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
        conversationId,
    } = req.query
    let conversation = await Database.instance.Conversation.getOneConversation(conversationId);
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

router.put('/sendMess', async (req, res) => {
    const {
        senderId,
        conversationId,
        message,
        type
    } = req.body;
    try {
        let conversation = await Database.instance.Conversation.updateConversation(senderId, conversationId, message,type);
        // io.broadcast.emit('message', req.body);
        // io.on('message', (msg) => {
        //     console.log(msg);
        //     io.broadcast.emit('message-broadcast', req.body);
        // });
        res.send({
            newMess: conversation
        })
    } catch (err) {
        res.send({
            message: 'can not send messsage'
        })
    }
});

router.put('/sendFile', async (req, res) => {
    const {
        conversationId,
        senderId,
        nameFile,
        path
    } = req.body;
    try {
        let conversation = await Database.instance.Conversation.updateFileConversation(conversationId, senderId, nameFile, path);

        console.log(conversation)
        res.send({
            newFile: conversation
        })
    } catch (err) {
        res.send({
            message: 'can not send files'
        })
    }
});

module.exports = router;