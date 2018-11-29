var dbConn = null

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;

    // const url = (!process.env.PORT) ?
    //     'mongodb://localhost:27017/gig_db' : 'mongodb://bar:gigit3@ds111390.mlab.com:11390/gig_db'
    const url = 'mongodb://bar:gigit3@ds111390.mlab.com:11390/gig_db'

    return MongoClient.connect(url)
        .then(client => {
            console.log('Connected to MongoDB, YAY!!');

            client.on('close', () => {
                console.log('MongoDB Disconnected');
                dbConn = null;
            })
            dbConn = client.db()
            return dbConn;
        })
}

module.exports = { connect: connectToMongo }