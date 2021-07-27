const { MongoClient } = require("mongodb");
const connectionString = "mongodb://localhost:27017";

const client = new MongoClient(connectionString, {
    useUnifiedTopology: true
});

(async () => {
    try {
        await client.connect();
    } catch (error) {
        console.error(error);
    }
})();

module.exports = client;