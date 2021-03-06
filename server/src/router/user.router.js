const app = require('express');
const UserModel = require('../../models/user.model');
const Database = require('../database');
const body = require('body-parser')
const router = app.Router();

router.get('/hi', (req, res) => {
    res.send('hello')
})
// router.post("/", async (req, res) => {
//     const { email, displayname, avatar } = req.body;
//     try {
//         let allUser = await Database.instance.User.getAllUser();
//         for (let i = 0; i < allUser.length; i++) {
//             if (email == (allUser[i]).email) {
//                 res.send({
//                     message: 'This email is already existed',
//                 });
//                 return;
//             }
//         }
//         let user = await Database.instance.User.createUser(new UserModel(email, displayname, avatar));
//         res.send({
//             message: user,
//         });
//     } catch (err) {
//         res.send({
//             message: 'Can not create account',
//         })
//     }
// });

//create account for user use gmail
router.post("/email", async (req, res) => {
    const { email, userName, password } = req.body;
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
        let displayname = '';
        console.log(email)
        let test = new UserModel(email, userName, password);
        console.log(test.email)
        let user = await Database.instance.User.createUser(test);
        console.log(user)
        res.send({
            message: user,
        });
    } catch (err) {
        res.send({
            message: 'Can not create account',
        })
    }
});
router.get("/check", async (req, res) => {
    try {
        const { email, password } = req.query;
        var allUser;
        allUser = await Database.instance.User.getUserByEmail(email);
        console.log(allUser)     
        if (allUser.email== email  &&  allUser.password==password ) {
            res.send({
                message: true,
                user: allUser
            });
        }
        else {
            res.send({ message: false })
        }
    } catch (error) {
        console.log(error)
        res.send({
            message: error,
        })
    }
});


/////
router.get("/getByEmail", async (req, res) => {
    const { email } = req.query;
    let getByEmail = await Database.instance.User.getUserByEmail(email);
    res.send({
        getByEmail: getByEmail
    });
});

//get user by id
router.get("/getById", async (req, res) => {
    const { id } = req.query;
    let getById = await Database.instance.User.getUserById(id);
    res.send({
        getById: getById
    });
});


//get all user from database
router.get("/", async (req, res) => {
    let getUser = await Database.instance.User.getAllUser();
    res.send({
        getUser: getUser
    });
});


//update user info
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

//delete account
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



module.exports = router;