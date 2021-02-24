const express = require('express');
const server = express();
const Database = require('./database')
const bodyParser = require('body-parser')

const User = require('../models/user.model');


server.use(bodyParser.json());



server.post("/createUser", async(req,res)=>{
    const{email , displayname , avatar , status} = req.body;
    let user = await Database.instance.createUser(new User(email , displayname , avatar  , status));
    res.send({ message: user});
});
server.get("/getUser", async(req,res)=>{
    const {email} = req.query;
    let getUser = await Database.instance.getUserMail(email);
    res.send({getUser:getUser});
});
server.put("/updateUser", async(req,res)=>{
    const{email , displayname , avatar , status} = req.body;
    try{
        await Database.instance.getUserMailandupdate(email,displayname , avatar , status);
    res.send({message: `Update[${email}]`});
    }catch(erro)
    {
        res.status(400).send({message:  `Cannot Update[${email}]`});
    }
    
});



module.exports = server;