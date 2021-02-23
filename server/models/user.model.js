class user {
    
    /**
     * 
     * @param {String} email 
     * @param {String} displayname 
     * @param {String} avatar 
     * @param {String} friendList 
     */
    constructor(email,displayname,avatar,friendList)
    {
        this.email = email;
        this.displayname = displayname;
        this.avatar = avatar;
        this.friendList = friendList;
    }
    
}

module.exports= user;