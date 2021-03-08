class UserModel {
    
    /**
     * 
     * @param {String} email 
     * @param {String} userName 
     * @param {String} displayname 
     * @param {String} password 
     */
    constructor(email, userName, avatar, password)
    {
        this.email = email;
        this.userName = userName;
        this.password=password;
        this.avatar = avatar;
        this.friendList =[];
        this.conversations = [];
        this.status = true;
    }
    
}

module.exports= UserModel;