class UserModel {
    
    /**
     * 
     * @param {String} email 
     * @param {String} displayname 
     * @param {String} password 
     */
    constructor(email, displayname, avatar, password)
    {
        this.email = email;
        this.userName = displayname;
        this.password=password;
        this.avatar = avatar;
        this.friendList =[];
        this.friendListRequest = [];
        this.conversations = [];
        this.status = true;
    }
    
}

module.exports= UserModel;