const mongoose = require('mongoose');
const UserModel = require('../../models/user.model');
const friendrequest = require('../../schemas/friendrequest.schemas');
const friend = require('../../models/friend.model');

class FriendClass {
    constructor() {
        /**
         * @type {mongoose.Model<any>}
         */
        this.friendrequest = mongoose.model('friendrequest', friendrequest);

    }
    
     /**
      * 
      * @param {FriendModel} newFriend 
      * 
      */
    async createFriendRequest(newFriend) {
        return await this.User.create(newFriend);
    }

    



}