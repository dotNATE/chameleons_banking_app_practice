const ObjectId = require('mongodb').ObjectId

let getAllAccounts = async (db) => {
    const collection = db.collection('accounts')
    const data = await collection.find({}).toArray()
    return data
}

let getSingleAccountById = async (db, req) => {
    const collection = db.collection('accounts')
    const data = await collection.findOne({_id: ObjectId(req.params.id)})
    return data
}

let depositIntoAccount = async (db, req) => {
    const collection = db.collection('accounts')
    const data = await collection.updateOne({_id: ObjectId(req.body.id)}, {$inc: {balance: req.body.amount}})
    return data.modifiedCount
}

let withdrawFromAccount = async (db, req) => {
    const collection = db.collection('accounts')
    const data = await collection.updateOne({_id: ObjectId(req.body.id)}, {$inc: {balance: -req.body.amount}})
    return data.modifiedCount
}

let executeAccountTransfer = async (db, req) => {
    const collection = db.collection('accounts')
    const withdrawal = await collection.updateOne({_id: ObjectId(req.body.id)}, {$inc: {balance: -req.body.amount}})
    const deposit = await collection.updateOne({_id: ObjectId(req.body.destinationId)}, {$inc: {balance: req.body.amount}})
    return (withdrawal.modifiedCount && deposit.modifiedCount)
}

let deleteAccount = async (db, req) => {
    const collection = db.collection('accounts')
    const data = await collection.deleteOne({_id: ObjectId(req.body.id)})
    return data.deletedCount
}

module.exports.getAllAccounts = getAllAccounts
module.exports.getSingleAccountById = getSingleAccountById
module.exports.depositIntoAccount = depositIntoAccount
module.exports.withdrawFromAccount = withdrawFromAccount
module.exports.executeAccountTransfer = executeAccountTransfer
module.exports.deleteAccount = deleteAccount