class UserModel {
    
    /**
     * 
     * @param {String} email 
     * @param {String} displayname 
     * @param {String} avatar 
     */
    constructor(email,displayname,avatar)
    {
        
        this.email = email;
        this.displayname = displayname;
        this.avatar = avatar;
        this.friendList =[];
        this.conversations = [];
        this.status = true;
    }
    
}

module.exports= UserModel;