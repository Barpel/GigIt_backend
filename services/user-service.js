'use strict'
const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId

function query() {
    return mongoService.connect()
        .then(db => db.collection('user_db').find().toArray())
}

function getById(userId) {
    const _id = new ObjectId(userId)
    return mongoService.connect()
        .then(db => db.collection('user_db').findOne(_id))
}

function checkLogin(userCreds) {
    return mongoService.connect()
        .then(db => db.collection('user_db').findOne({ ...userCreds }))
}

function add(userData) {
    var user = { userData }
    return mongoService.connect()
        .then(db => db.collection('user_db').insertOne(user))
        .then(res => {
            user._id = res.insertedId
            return user
        })
}

function remove(userId) {
    const _id = new ObjectId(userId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('user_db')
            return collection.remove({ _id: userId })
        })
}

function update(user) {
    user.id = new ObjectId(user._id)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('user_db')
            return collection.updateOne({ _id: user._id }, { $set: user })
                .then(result => {
                    return user
                })
        })
}

module.exports = {
    query,
    getById,
    checkLogin,
    add,
    remove,
    update
}