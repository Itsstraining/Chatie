const app = require('express');
const UserModel = require('../../models/user.model');
const Database = require('../database');
const body = require('body-parser')
const router = app.Router();

 router.get('/search', (req, res) => {
    const {id} = req.query;
    let getById = Database.instance.User.findFriend(id);
    res.send({
        getById: getById
    });
});



router.get('/getusername',async (req, res) => {
    const {userName,id} = req.query;
    let getUserByUsername = await Database.instance.User.getUserByUsername(userName,id);
    res.send({
        getUserByUsername:getUserByUsername
    });
});

router.put("/addfriendrequest", async (req, res) => {
    const { userName,_id, friendName} = req.body;
    try {
        let sendFriendRequest = await Database.instance.User.addFriendRequest(userName,_id,friendName);
        res.send({ message: sendFriendRequest });
    } catch (erro) {
        res.status(400).send({ message: `Cannot send` });
    }
});



//create account for user use gmail
router.post("/email", async (req, res) => {
    const { email, userName } = req.body;
    try {
        let allUser = await Database.instance.User.getAllUser();
        for (let i = 0; i < allUser.length; i++) {
            if (email == (allUser[i]).email || userName == (allUser[i]).userName) {
                res.send({
                    message: 'This email or username is already existed',
                });
                return;
            }
        }
        let avatar = 'https://i1.sndcdn.com/avatars-000480605109-m7g7ci-t500x500.jpg';
        let newName = userName.substring(0, 14);
        let test = new UserModel(email, newName, avatar, '');
        let user = await Database.instance.User.createUser(test);
        res.send({
            message: user,
        });
    } catch (err) {
        res.send({
            message: 'Can not create account',
        })
    }
});

router.post("/createAccount", async (req, res) => {
    const { email, userName, password, retypePass } = req.body;
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
        if(email == null){
            res.send({
                message: 'Email is blank',
            });
            return;
        }
        if(userName == null){
            res.send({
                message: 'Username is blank',
            });
            return;
        }else if(userName.length > 15){
            res.send({
                message: 'Username length must under 15 words',
            });
            return;
        }
        if(password == null){
            res.send({
                message: 'Password must be fill in',
            });
            return;
        }
        if(retypePass == null){
            res.send({
                message: 'Password must be retype again',
            });
            return;
        }else if(retypePass != password){
            res.send({
                message: 'Retype password wrong',
            });
            return;
        }
        let avatar = 'https://i1.sndcdn.com/avatars-000480605109-m7g7ci-t500x500.jpg';
        let test = new UserModel(email, userName, avatar, password);
        let user = await Database.instance.User.createUser(test);
        res.send({
            message: 'Create an account successfully',
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
        let allUser;
        allUser = await Database.instance.User.getUserByEmail(email);
        console.log(allUser)     
        if (allUser.email== email  &&  allUser.password==password ) {
            res.send({
                message: 'Login successful',
                user: allUser
            });
        }
        else {
            res.send({ message: 'Email or password is wrong.' })
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
    const { id, userName, avatar} = req.body;
    try {
        let temp = await Database.instance.User.updateProfile(id, userName, avatar);
        res.send({
            message: "Update successfully",
            user: temp
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

router.get('/getfriendlist', async (req, res) => {
    const { userId } = req.query;
    try{
        let tempListFriend = await Database.instance.User.getUserFriendList(userId);
        res.send({
            tempListFriend: tempListFriend,
        })
    }catch(err){
        res.send({
            message: 'You do not any friend.'
        })
    }
})

router.put('/deleteFriend', async (req, res) => {
    const { id, friendId } = req.body;
    try {
        let deleteFriendMess = await Database.instance.User.DeleteFriend(id, friendId);
        res.send({
            message: deleteFriendMess
        })
    } catch (error) {
        res.send({
            message: 'Can not unfriend'
        })
    }
})

module.exports = router;