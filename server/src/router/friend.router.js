const app = require('express');
const ConversationModel = require('../../models/conversation.model');
const FriendRequestModel = require('../../models/friendRequest.model');
const Database = require('../database');

const router = app.Router();


router.put("/addfriend", async (req, res) => {
    const { id, friendListRequest , accept } = req.body;
    try {
        let addfriend = await Database.instance.User.addFriend(id, friendListRequest,accept);
        res.send({ message: addfriend });
    } catch (erro) {
        res.status(400).send({ message: `Cannot add` });
    }
});

// router.put("/addfriendrequest", async (req, res) => {
//     const {userName, id, friendName } = req.body;
//     try {
//         let sendFriendRequest = await Database.instance.User.addFriendRequest(userName, id, friendName);
//         res.send({ message: sendFriendRequest });
//     } catch (erro) {
//         res.status(400).send({ message: `Cannot add` });
//     }
// });

router.post('/addfriendrequest', async (req, res) => {
    const { to, from } = req.body;
    try{
        let request = await Database.instance.Friend.createFriendRequest(new FriendRequestModel(to, from))
        console.log(request)
        res.send({
            request: request,
        })
    }catch(err){
        res.send({
            message: "Can not send friend request!"
        })
    }
})

//get user friend request lists
router.get('/getlistrequest' , async (req, res) =>{
    const { userId } = req.query;
    try{
        let listRequest = await Database.instance.Friend.getRequestList(userId);
        res.send({
            message: `You have ${listRequest.length} friend requests`,
            listRequest: listRequest,
        })
    }catch(err){
        res.send({
            message: 'You do not have any requests.'
        })
    }
})

router.put('/checkrequestlist', async (req, res) => {
    const { from, to, status } = req.body;
    try {
        let mess = await Database.instance.Friend.checkRequestList(from, to, status);
        res.send(mess)
    } catch (error) {
        res.send({
            message: 'Can not add this friend'
        })
    }
})

router.delete("/delete", async (req, res) => {
    const { id, friendId } = req.body;
    try {
        let Deletefriend = await Database.instance.DeleteFriend(id, friendId);
        res.send({ message: Deletefriend });
    } catch (erro) {
        res.status(400).send({ message: `Cannot delete` });
    }
});



module.exports = router;