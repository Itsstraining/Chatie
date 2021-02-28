const app = require('express');
const ConversationModel = require('../../models/conversation.model');
const Database = require('../database');

const router = app.Router();


<<<<<<< HEAD
router.post("/", async (req, res) => {
    const { id, friendId } = req.body;
    try {
        let addfriend = await Database.instance.User.addFriend(id, friendId);
=======
router.put("/addfriend", async (req, res) => {
    const { id, friendListRequest , accept } = req.body;
    try {
        let addfriend = await Database.instance.User.addFriend(id, friendListRequest,accept);
>>>>>>> 6834d63e9d210cadca1659746620d4fcb363389d
        res.send({ message: addfriend });
    } catch (erro) {
        res.status(400).send({ message: `Cannot add` });
    }
});

router.put("/addfriendrequest", async (req, res) => {
    const { id, friendId } = req.body;
    try {
        let sendFriendRequest = await Database.instance.User.addFriendRequest(id, friendId);
        res.send({ message: sendFriendRequest });
    } catch (erro) {
        res.status(400).send({ message: `Cannot add` });
    }
});

router.put("/delete", async (req, res) => {
    const { id, friendId } = req.body;
    try {
        let Deletefriend = await Database.instance.DeleteFriend(id, friendId);
        res.send({ message: Deletefriend });
    } catch (erro) {
        res.status(400).send({ message: `Cannot delete` });
    }
});


module.exports = router;