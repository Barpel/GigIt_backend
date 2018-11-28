const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    remove,
    getById,
    add,
    update
}

function query() {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('gig')
            return collection.find({}).toArray()
        })
}

function remove(gigId) {
    gigId = new ObjectId(gigId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('gig')
            return collection.remove({ _id: gigId })
        })
}

function getById(gigId) {
    gigId = new ObjectId(gigId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('gig')
            return collection.findOne({ _id: gigId })
        })
}

function add(gig) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('gig')
            return collection.insertOne(gig)
                .then(result => {
                    return gig
                })
        })
}

function update(gig) {
    gig._id = new ObjectId(gig._id)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('gig')
            return collection.updateOne({ _id: gig._id }, { $set: gig })
                .then(result => {
                    return gig
                })
        })
}