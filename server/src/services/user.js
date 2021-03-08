const mongoose = require('mongoose');
const UserModel = require('../../models/user.model');
const userSchema = require('../../schemas/user.schemas');
const ConversationClass = require('../services/conversation');

class UserClass {
    constructor() {
        /**
         * @type {mongoose.Model<any>}
         */
        this.User = new mongoose.model("User", userSchema);
        this.Conversation = new ConversationClass();
    }

    /**
     * @param {UserModel} newUser
     */
    async createUser(newUser) {
        return await this.User.create(newUser);
    }

    async getAllUser() {
        return await this.User.find();
    }

    async getUserByEmail(email) {
        return await this.User.findOne({
            email: email
        }).exec();
    }

    //Get all conversation 
    async getAllUserConversation(userId) {
        return (await this.User.findOne({
            _id: userId
        }, {
            sort: {
                date: -1
            }
        })).conversations;
    }

    /**
     * 
     * @param {String} id 
     * @param {String} userName 
     * @param {String} avatar 
     */
    async updateProfile(id, userName, avatar) {
        
        return await this.User.findOneAndUpdate({
            _id: id
        }, {
            userName: userName,
            avatar: avatar,
        });
    }

    async chat(id, receiverId, newConversationId) {
        // const changeStream = this.User.watch().on('change', change => console.log(change));
        await this.User.findOneAndUpdate({
            _id: id
        }, {
            $push: {
                conversations: [newConversationId]
            }
        });
        await this.User.findOneAndUpdate({
            _id: receiverId
        }, {
            $push: {
                conversations: [newConversationId]
            }
        });
        // console.log(changeStream)
        return 'You two are chatting'
    }

    async getUserById(id) {
        return await this.User.findOne({
            _id: id
        });
    }


    async getUserByUsername(userName,id) {
        return await this.User.findOne({userName: userName,_id:id});
    }

    
    async deleteUser(id) {
        await this.User.findOneAndDelete({
            _id: id
        });
    }

    /**
     * 
     * @param {String} id 
     * @param {String} friendId 
     * 
     */

    /// ds chờ
    // async addFriendRequest(id, friendId) {
    //     // Optional. Use this if you create a lot of connections and don't want
    //     // to copy/paste `{ useNewUrlParser: true }`.
    //     mongoose.set('useNewUrlParser', true);
    //     let user = await this.getId(id);
    //     for (let i = 0; i < user.friendList.length; i++) {
    //         if (friendId == user.friendList[i]) {
    //             return 'Already be friend';
    //         }
    //     }
    //     // user.friendList.push(friendId);                  
    //     await this.User.updateOne({ _id: friendId }, { $push: { friendListRequest: [id] } });
    //     return 'Friends'
    // }

   
   
   
   
   ///Send Friend Request
    /**
     * 
     * @param {String} userName 
     * @param {String} friendName 
     * @param {String} id
     *
     */
    async addFriendRequest(userName,id,friendName) {
        mongoose.set('useNewUrlParser', true);
        let user = await this.getUserByUsername(userName,id,friendName);
        for (let i = 0; i < user.friendList.length; i++) {
            if (friendName == user.friendList[i]) {
                return 'Already send friend request';
            }
        }
        // user.friendList.push(friendId);                  
        await this.User.updateOne({
            userName: friendName
        }, {
            $push: {
                friendListRequest: [userName] 
            }
        });
        return 'Have send friend request'
    }

    // async addFriend(id, friendId, accept) {
    //     mongoose.set('useNewUrlParser', true);
    //     let user = await this.getId(id);
    //     for (let i = 0; i < user.friendListRequest.length; i++) {
    //     if (accept) {
    //         await this.User.updateOne({
    //             _id: id
    //         }, {
    //             $push: {
    //                 friendList: [friendId]
    //             }
    //         });
    //         await this.User.updateOne({
    //             _id: friendId
    //         }, {
    //             $push: {
    //                 friendList: [id]
    //             }
    //         })
    //         return 'You two are friends now.';
    //     }
    //     }
    // }

    async addFriend(userId, friendId){
        await this.User.findOneAndUpdate({_id: userId}, {
            $push: { friendList: [friendId]},
        });
        await this.User.findOneAndUpdate({_id: friendId}, {
            $push: { friendList: [userId]},
        });
        return 'You two are friends now.'
    }

    /**
     * 
     * @param {String} id 
     * @param {String} friendId 
     * 
     */
    async DeleteFriend(id, friendId) {
        // Optional. Use this if you create a lot of connections and don't want
        // to copy/paste `{ useNewUrlParser: true }`.
        mongoose.set('useNewUrlParser', true);
        await this.User.updateOne({
            _id: id
        }, {
            $pull: {
                friendList: {
                    $in: [friendId]
                }
            }
        });
        await this.User.updateOne({
            _id: friendId
        }, {
            $pull: {
                friendList: {
                    $in: [id]
                }
            }
        });
        return 'Deleted';
    }

    async LoginWithEmail(newUser) {
        return await this.User.create(newUser);
    }
    //sort conversation base on recent update
    async sortRecentConver(userId, conversationId) {
        let tempUser = await this.getUserById(userId);
        for (let i = 0; i < tempUser.conversations.length; i++) {
            if (conversationId == tempUser.conversations[i] && i != 0) {
                let temp = tempUser.conversations[0];
                tempUser.conversations[0] = tempUser.conversations[i];
                tempUser.conversations[i] = temp;
            }
        }
        await this.User.findByIdAndUpdate({
            _id: userId
        }, {
            conversations: tempUser.conversations
        })
    }
    ///fiend Friend

    async findFriend(id) {
        mongoose.set('useNewUrlParser', true);
        await this.User.Model.find({
            _id: {
                $nin: friendList,
            }
        }, (err, result) => {});
    }

    async getUserFriendList(userId){
       let temp = await this.User.findOne({_id: userId});
       return temp.friendList;
    }

    // async getUserNotFriend(userId){
    //     let temp = (await this.User.findOne({_id: userId})).friendList;

    // }
}

module.exports = UserClass;