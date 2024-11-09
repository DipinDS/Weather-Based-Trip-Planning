const { MongoClient } = require('mongodb')
const state = {
    db: null
}

module.exports.connect_db = async function () {
    const url = "mongodb://127.0.0.1:27017";
    const dbname = 'TripPlanner';
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("Connected to Database");
        state.db = client.db(dbname)
        // You can access the database through client.db()
        // await client.close()
        // console.log("CONNECTION CLOSED");
    } catch (err) {
        console.error("Error occurred:", err);
    }
}

module.exports.get = function () {
    return state.db
}
