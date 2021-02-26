const express = require('express');
const server = express();
const Database = require('./database');
const bodyParser = require('body-parser');
const ConversationModel = require('../models/conversation.model');
const User = require('../models/user.model');

server.use(bodyParser.json());


server.post('/', async (req, res) => {
    const {
        sender,
        receiver
    } = req.body;
    let conver = await Database.instance.Conversation.createConversation(new ConversationModel(sender, receiver));
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
//CRUD Users
server.post("/createUser", async (req, res) => {
    const { email, displayname, avatar, status } = req.body;
    let user = await Database.instance.createUser(new User(email, displayname, avatar, status));
    res.send({ message: user });
});

server.delete("/deleteUser", async (req, res) => {
    const { id } = req.query;
    console.log(id)
     await Database.instance.deleteUser(id);
    res.send({ message: `Delete ${id} ` });
});



server.get("/getUser", async (req, res) => {
    const {
        email
    } = req.query;
    let getUser = await Database.instance.getUser();
    res.send({
        getUser: getUser
    });
});

server.get("/getemail", async (req, res) => {
    const { email } = req.body;
    let getemail = await Database.instance.getUserMail(email);
    res.send({
        message: getemail
    });
});


server.get("/getid", async (req, res) => {
    const { id } = req.body;
    let getid = await Database.instance.getId(id);
    res.send({
        message: getid
    });
});


server.put("/addfriend", async (req, res) => {
    const { id, friendId } = req.body;
    try {
        let addfriend = await Database.instance.addFriend(id, friendId);
        res.send({ message: addfriend });
    } catch (erro) {
        res.status(400).send({ message: `Cannot add` });
    }
});

server.put("/deletefriend", async (req, res) => {
    const { id, friendId } = req.body;
    try {
        let Deletefriend = await Database.instance.DeleteFriend(id, friendId);
        res.send({ message: Deletefriend });
    } catch (erro) {
        res.status(400).send({ message: `Cannot delete` });
    }
});

server.put("/updateUser", async (req, res) => {
    const { email, displayname, avatar, status } = req.body;
    try {
        await Database.instance.getUserMailandupdate(email, displayname, avatar, status);
        res.send({ message: `Update ${email}` });
    } catch (erro) {
        res.status(400).send({ message: `Cannot Update[${email}]` });
    }

});
server.put("/Logingg", async (req, res) => {
    const { email } = req.body;
    try {
        await Database.instance.Login(email);
        res.send({ message: `Update ${email}` });
    } catch (erro) {
        res.status(400).send({ message: `Cannot Login with[${email}]` });
    }
});


module.exports = server;