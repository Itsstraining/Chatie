const mongoose = require('mongoose')
class Database {
    /**
     * @type {Database}
     */
    static _cache = null;

    static get instance() {
        if (this._cache == null) {
            return this._cache = new Database();
        }
        return this._cache;
    }

    async connectToMongoDB(connectionString) {
        return new Promise((resolve, reject) => {
            mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
            const db = mongoose.connection;
            db.on("error", (err) => {
                reject(err);
            });

            db.once('open', function () {
                console.log('Connection Successfully!');
                resolve(db);
            });
        });
    }

}



module.exports = Database;