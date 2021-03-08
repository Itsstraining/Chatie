class FriendRequestModel {

    /**
     * 
     * @param {String} to 
     * @param {String} from 
     */
    constructor(to,from) {
        this.to= to;
        this.from = from;
        this.status = -1;
    }
}

module.exports = FriendRequestModel;