const app = require('express');
const UserModel = require('../../models/user.model');
const Database = require('../database');

const router = app.Router();

router.post("/", async (req, res) => {
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

//create account for user use gmail
router.post("/email", async (req, res) => {
    const { email, avatar } = req.body;
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
        let displayname ='';
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
    let getUser = await Database.instance.User.getAllUser();
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

router.put("/updateUser", async (req, res) => {
    const { email, displayname, avatar, status } = req.body;
    try {
        await Database.instance.getUserMailandupdate(email, displayname, avatar, status);
        res.send({ message: `Update ${email}` });
    } catch (erro) {
        res.status(400).send({ message: `Cannot Update[${email}]` });
    }

});
// router.post("/email", async (req, res) => {
//     const { email } = req.body;
//     try {
//         await Database.instance.Login(email);
//         res.send({ message: `Update ${email}` });
//     } catch (erro) {
//         res.status(400).send({ message: `Cannot Login with[${email}]` });
//     }
// });

// router.post("/createUser", async (req, res) => {
//     const { email, displayname, avatar, status } = req.body;
//     let user = await Database.instance.createUser(new User(email, displayname, avatar, status));
//     res.send({ message: user });
// });

// router.delete("/deleteUser", async (req, res) => {
//     const { id } = req.query;
//     console.log(id)
//      await Database.instance.deleteUser(id);
//     res.send({ message: `Delete ${id} ` });
// });



// router.get("/getUser", async (req, res) => {
//     const {
//         email
//     } = req.query;
//     let getUser = await Database.instance.getUser();
//     res.send({
//         getUser: getUser
//     });
// });

// router.get("/getemail", async (req, res) => {
//     const { email } = req.body;
//     let getemail = await Database.instance.getUserMail(email);
//     res.send({
//         message: getemail
//     });
// });

// router.get("/getid", async (req, res) => {
//     const { id } = req.body;
//     let getid = await Database.instance.getId(id);
//     res.send({
//         message: getid
//     });
// });

module.exports = router;