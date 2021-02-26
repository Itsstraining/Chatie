const app = require('express');
const UserModel = require('../../models/user.model');
const Database = require('../database');

const router = app.Router();

router.post("/createUser", async (req, res) => {
    const { email, displayname, avatar} = req.body;
    try {
        let allUser = await Database.instance.User.getAllUser();
        for (let i = 0; i < allUser.length; i++) {
            if (email == (allUser[i]).email) {
                res.send({
                    message: 'This email is already existed',
                });
                return;
            }
        }
        let user = await Database.instance.User.createUser(new UserModel(email, displayname, avatar));
        res.send({
            message: user,
        });
    } catch (err) {
        res.send({
            message: 'Can not create account',
        })
    }
});

router.get("/", async (req, res) => {
    const { email } = req.query;
    let getUser = await Database.instance.User.getAllUser(email);
    res.send({
        getUser: getUser
    });
});
router.put("/updateUser", async (req, res) => {
    const { id, email, displayname, avatar, status } = req.body;
    try {
        await Database.instance.User.updateProfile(id, email, displayname, avatar, status);
        res.send({
            message: "Update successfully"
        });
    } catch (erro) {
        res.status(400).send({
            message: `Cannot Update`
        });
    }

});

router.delete("/", async (req, res) => {
    const { email } = req.body;
    try {
        await Database.instance.User.deleteUser(email);
        res.send({
            message: "Delete account successfully",
        });
    } catch (error) {
        res.send({
            message: "Can not delete account",
        });
    }
});

module.exports = router;