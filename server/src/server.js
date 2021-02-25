const express = require('express');
const server = express();
const Database = require('./database');
const bodyParser = require('body-parser');
const ConversationModel = require('../models/conversation.model');
const MessageModel = require('../models/message.model');

server.use(bodyParser.json());



//Conversation
server.post('/', async (req, res) => {
    const {
        sender,
        receiver
    } = req.body;
    let conver = await Database.instance.Conversation.createConversation(new ConversationModel(receiver));
    res.send({
        conver: conver,
    })
})

server.get('/', async (req, res) => {
    let conversations = await Database.instance.Conversation.getAllConversation();
    res.send({
        message: conversations,
    })
})

server.get('/findreceiver', async (req, res) => {
    const {
        receiver
    } = req.query;
    let conversation = await Database.instance.Conversation.getOneConversation(receiver);
    res.send({
        message: conversation,
    })
})

server.put('/findupdate', async (req, res) => {
    const {
        receiver,
        message
    } = req.body;
    let conversation = await Database.instance.Conversation.updateConversation(receiver, message);
    res.send({
        message: message
    })
})

server.post("/createUser", async(req,res)=>{
    const{email , displayname , avatar , status} = req.body;
    let user = await Database.instance.createUser(new User(email , displayname , avatar  , status));
    res.send({ message: user});
});
server.get("/getUser", async (req, res) => {
    const {
        email
    } = req.query;
    let getUser = await Database.instance.getUserMail(email);
    res.send({
        getUser: getUser
    });
});
server.put("/updateUser", async(req,res)=>{
    const{email , displayname , avatar , status} = req.body;
    try{
        await Database.instance.getUserMailandupdate(email,displayname , avatar , status);
    res.send({message: `Update ${email}`});
    }catch(erro)
    {
        res.status(400).send({message:  `Cannot Update[${email}]`});
    }

});
//Message
server.post("/create", (req, res) => {
    const {
        message
    } = req.body;
    try {
        let newMessage = Database.instance.Message.createMessage(new MessageModel(message));
        res.send('Messsage has been created')
    } catch (error) {
        res.send('Message has not been created')

    }
});

server.get("/getmess", async (req, res) => {
    let getMessage = await Database.instance.Message.getAllMessage();
    res.send({
        getMess: getMessage,
    })
});

server.get("/getMessageID", async (req, res) => {
    const{id} = req.body;
    try {
        let messageID = await Database.instance.Message.getMessageByID(id);
        console.log(messageID)
        res.send({ content: messageID})
    } catch (error) {
        res.send('err')
    }
})



module.exports = server;