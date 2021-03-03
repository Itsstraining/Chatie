class UserModel {
    
    /**
     * 
     * @param {String} email 
     * @param {String} displayname 
     * @param {String} password 
     */
    constructor(email,displayname,password)
    {
        this.email = email;
        this.username = displayname;
        this.password=password;
        this.avatar = '';
        this.friendList =[];
        this.friendListRequest = [];
        this.conversations = [];
        this.status = true;
    }
    
}

module.exports= UserModel;