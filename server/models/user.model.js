class User {
    
    /**
     * 
     * @param {String} email 
     * @param {String} displayname 
     * @param {String} avatar 
     * @param {Boolean} status
     */
    constructor(email,displayname,avatar,status)
    {
        
        this.email = email;
        this.displayname = displayname;
        this.avatar = avatar;
        this.friendList =[];
        this.status = status;
    }
    
}

module.exports= User;