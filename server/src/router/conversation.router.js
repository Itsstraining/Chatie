const server = require('express');
const Database = require('../database');

const router = server.Router();

router.post('/', (req, res) => {
    const {receiver} = req.body;
    let conver = await Database.instance.Conversation.getOneConversation(receiver);
    if(conver){
        Database.instance.Conversation.updateConversation()
    }

})

module.exports = router;