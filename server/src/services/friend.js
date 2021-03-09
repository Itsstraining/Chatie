const mongoose = require('mongoose');
const MessageModel = require('../../models/message.model');
const UserModel = require('../../models/user.model');
const friendrequest = require('../../schemas/friendrequest.schemas');
const ConversationClass = require('./conversation');
const MessageClass = require('./message');
const UserClass = require('./user');
class FriendClass {
    constructor() {
        /**
         * @type {mongoose.Model<any>}
         */
        this.FriendRequest = mongoose.model('FriendRequest', friendrequest);
        this.user = new UserClass();
        this.conversation = new ConversationClass();
        this.message = new MessageClass();
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
    // async checkRequestList(from, to, status){
    //     let temp = await this.FriendRequest.findOne({from: from});
        
    //     if(status == 1){
    //         // status = 1 => accept
    //         console.log(status)
    //         let mess = await this.user.addFriend(to, from);
    //         console.log(mess);
    //         await this.FriendRequest.remove(temp);
    //         return mess;
    //     }
    //     await this.FriendRequest.remove(temp);
    //     return 'You two are not friends.';
    // }

    async checkRequestList(from, to, status){
        let temp = await this.FriendRequest.findOne({from: from});
        if(status == 1){
            // status = 1 => accept
            let mess = await this.user.addFriend(to, from);
            let newConversation = await this.conversation.createConversation(to, from);
            let message =  await this.user.chat(to, from, newConversation._id);
            await this.conversation.updateConversation('', newConversation._id, message, 'text');
            await this.FriendRequest.deleteOne(temp);
            return {
                addmess: mess,
                message: message,
                newConversation: newConversation
            };
        }
        await this.FriendRequest.deleteOne(temp);
        return {
            addmess: 'You two are not friends.',
            message: '',
            newConversation: ''
        };
    }
}

module.exports = FriendClass;