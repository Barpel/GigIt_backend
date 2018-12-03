const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    remove,
    getById,
    add,
    update,

}

function query(filter) {
    // var criteria = {}
    // if(filter.byTitle) criteria = {"details.title":{$regex : `.*${filter.byTitle}.*`,$options: "i"}}
    // if(filter.byCategory) criteria.category = filter.byCategory
        return mongoService.connect()
        .then(db=>{
             const collection = db.collection('chat')
             return collection.find().toArray()
            //  return collection.find(criteria).toArray()
        })
}



function remove(chatId) {
    chatId = new ObjectId(chatId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('chat')
            return collection.remove({ _id: chatId })
        })
}

function getById(chatId) {
    chatId = new ObjectId(chatId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('chat')
            return collection.findOne({ _id: chatId })
        })
}

function add(chat) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('chat')
            return collection.insertOne(chat)
                .then(chat => chat.ops[0])
        })
}

function update(chat) {
    chat._id = new ObjectId(chat._id)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('chat')
            return collection.updateOne({ _id: chat._id }, { $set: chat })
                .then(result => {
                    return chat
                })
        })
}