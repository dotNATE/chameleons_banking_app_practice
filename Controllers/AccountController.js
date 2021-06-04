const DbService = require('../Services/DbService')
const AccountService = require('../Services/AccountService')
const JSONResponseService = require('../Services/JSONResponseService')

let getAllAccounts = (req, res) => {
    DbService.connectToDb(async (db) => {
        let accounts = await AccountService.getAllAccounts(db, req)
        let response = JSONResponseService.generateSuccessResponse()
        response.message = "Requested accounts successfully retrieved."
        response.data = accounts
        res.json(response)
    })
}

let getSingleAccountById = (req, res) => {
    DbService.connectToDb(async (db) => {
        let account = await AccountService.getSingleAccountById(db, req)
        let response = JSONResponseService.generateSuccessResponse()
        response.message = "Account successfully retrieved."
        response.data = [account]
        res.json(response)
    })
}

let insertNewAccount = (req, res) => {
    DbService.connectToDb(async (db) => {
        let insertSuccess = await AccountService.insertNewAccount(db, req)
        if (insertSuccess) {
            let response = JSONResponseService.generateSuccessResponse()
            response.message = "Account inserted successfully."
            res.json(response)
        } else {
            let response = JSONResponseService.generateFailureResponse()
            response.message = "No name provided. Account insertion failed."
            res.json(response)
        }
    })
}

let deleteAccount = (req, res) => {
    DbService.connectToDb(async (db) => {
        let deletedSuccess = await AccountService.deleteAccount(db, req)
        if (deletedSuccess) {
            let response = JSONResponseService.generateSuccessResponse()
            response.message = "Account deleted successfully."
            res.json(response)
        } else {
            let response = JSONResponseService.generateFailureResponse()
            response.message = "Account deletion failed."
            res.json(response)
        }
    })
}

let depositIntoAccount = (req, res) => {
    DbService.connectToDb(async (db) => {
        if (req.body.amount < 0 || typeof req.body.amount !== "number") {
            let response = JSONResponseService.generateFailureResponse()
            response.message = "Invalid amount value"
            return res.json(response)
        }
        let depositSuccess = await AccountService.depositIntoAccount(db, req)
        if (depositSuccess) {
            let response = JSONResponseService.generateSuccessResponse()
            response.message = "Your deposit was completed successfully."
            res.json(response)
        } else {
            let response = JSONResponseService.generateFailureResponse()
            response.message = "There is no account found with that ID."
            response.status = 404
            res.json(response)
        }
    })
}

let withdrawFromAccount = (req, res) => {
    DbService.connectToDb(async (db) => {
        if (req.body.amount < 0 || typeof req.body.amount !== "number") {
            let response = JSONResponseService.generateFailureResponse()
            response.message = "Invalid amount value"
            return res.json(response)
        }

        let withdrawalSuccess = await AccountService.withdrawFromAccount(db, req)

        if (withdrawalSuccess) {
            let response = JSONResponseService.generateSuccessResponse()
            response.message = "Your withdrawal was completed successfully."
            res.json(response)
        } else {
            let response = JSONResponseService.generateFailureResponse()
            response.message = "Something went wrong with your withdrawal. Your account has not been affected."
            res.json(response)
        }
    })
}

let executeAccountTransfer = (req, res) => {
    DbService.connectToDb(async (db) => {
        if (req.body.amount < 0 || typeof req.body.amount !== "number") {
            let response = JSONResponseService.generateFailureResponse()
            response.message = "Invalid amount value."
            return res.json(response)
        }
        const transferSuccess = await AccountService.executeAccountTransfer(db, req)
        if (transferSuccess) {
            let response = JSONResponseService.generateSuccessResponse()
            response.message = "Your transfer was completed successfully."
            res.json(response)
        }
    })
}

module.exports.getAllAccounts = getAllAccounts
module.exports.getSingleAccountById = getSingleAccountById
module.exports.depositIntoAccount = depositIntoAccount
module.exports.withdrawFromAccount = withdrawFromAccount
module.exports.executeAccountTransfer = executeAccountTransfer
module.exports.deleteAccount = deleteAccount
module.exports.insertNewAccount = insertNewAccount