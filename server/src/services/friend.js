const mongoose = require('mongoose');
const UserModel = require('../../models/user.model');
const friendrequest = require('../../schemas/friendrequest.schemas');
const UserClass = require('./user');
class FriendClass {
    constructor() {
        /**
         * @type {mongoose.Model<any>}
         */
        this.FriendRequest = mongoose.model('FriendRequest', friendrequest);
        this.user = new UserClass();
    }
    
     /**
      * 
      * @param {FriendRequestModel} newFriend 
      * 
      */
    async createFriendRequest(newFriend) {
        return await this.FriendRequest.create(newFriend);
    }

    //get user friend request lists
    async getRequestList(userId){
        return await this.FriendRequest.find({ to: userId});
    }

    //check accept or denied
    async checkRequestList(from, to, status){
        let temp = await this.FriendRequest.findOne({from: from});
        
        if(status == 1){
            // status = 1 => accept
            console.log(status)
            let mess = await this.user.addFriend(to, from);
            console.log(mess);
            await this.FriendRequest.remove(temp);
            return mess;
        }
        await this.FriendRequest.remove(temp);
        return 'You two are not friends.';
    }
}

module.exports = FriendClass;