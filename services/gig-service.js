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
    // if (filter = {}) {
    //     console.log('hey')
    //     return mongoService.connect()
    //         .then(db => {
    //             const collection = db.collection('gig')
    //             return collection.find().toArray()
    //         })
    // }
    var criteria = {}
    if (filter.byTitle) criteria = { "details.title": { $regex: `.*${filter.byTitle}.*`, $options: "i" } }
    if (filter.byCategory) criteria.category = filter.byCategory
    if (filter.isActive) criteria.isActive = filter.isActive
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('gig')
            return collection.find(criteria).toArray()
        })
}

// ---- GET ALL AGGREGATION TO JOIN USER ----
// db.getCollection('gig').aggregate([
//     {
//       $lookup:
//         {
//           from: "user",
//           localField: "publisherId",
//           foreignField: "_id",
//           as: "publisher"
//         }
//    }
//  ])



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

// ---- GET BY ID AGGREGATION TO JOIN USER ----
// db.getCollection('gig').aggregate(
//     [ { $match :
//         { _id : ObjectId("5c1043a9e5fc5b38705e1fe5")} //could be any other id
//         },
//        {
//          $lookup:
//            {
//              from: "user",
//              localField: "publisherId",
//              foreignField: "_id",
//              as: "publisher"
//            }
//       }
//         ]
//    )

function add(gig) {
    gig.publisherId = new ObjectId(gig.publisherId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('gig')
            return collection.insertOne(gig)
                .then(gig => gig.ops[0])
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