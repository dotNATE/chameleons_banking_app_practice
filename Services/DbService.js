const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://root:password@localhost:27017'
const dbName = 'chameleons_banking_app'

const Client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true})

let connectToDb = (callback) => {
    Client.connect((error) => {
        let database = Client.db(dbName)
        callback(database)
    })
}

module.exports.connectToDb = connectToDb