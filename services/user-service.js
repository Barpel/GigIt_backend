'use strict'
const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    login,
    add,
    remove,
    update
}

function query() {
    console.log('UHU im here BACKEND')
    return mongoService.connect()
        .then(db => db.collection('user').find().toArray())
}

function getById(userId) {
    const _id = new ObjectId(userId)
    return mongoService.connect()
        .then(db => db.collection('user').findOne(_id))
}

function login(userCreds) {
    return mongoService.connect()
        .then(db => db.collection('user').findOne(userCreds))
}

function add(userData) {
    var user = JSON.parse(JSON.stringify(userData))
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('user')
            return collection.findOne({username: user.username})
                .then(res => {
                    if(!res) return collection.insertOne(user)
                    else return Promise.reject('username taken')
                })
        })
        .then(res => {
            user._id = res.insertedId
            return user
        })
}

function remove(userId) {
    const _id = new ObjectId(userId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('user')
            return collection.remove({ _id})
        })
}

function update(user) {
    user._id = new ObjectId(user._id)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('user')
            return collection.updateOne({ _id: user._id }, { $set: user })
                .then(result => {
                    return user
                })
        })
}
