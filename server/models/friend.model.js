class FriendModel {

    /**
     * 
     * @param {String} to 
     * @param {String} from 
     * @param {Boolean} status 
     */
    constructor(to,from,status) {
        this.to= to;
        this.from = from;
        this.status = status;
    }
}

module.exports = FriendModel;