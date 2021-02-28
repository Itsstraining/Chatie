class UserModel {
    
    /**
     * 
     * @param {String} email 
     * @param {String} displayname 
     * @param {String} avatar
     * @param {String} password 
     */
    constructor(email,displayname,avatar,password)
    {
        this.email = email;
        this.username = username;
        this.avatar = avatar;
        this.friendList =[];
        this.friendListRequest = [];
        this.conversations = [];
        this.status = true;
    }
    
}

module.exports= UserModel;