const DbService = require('../Services/DbService')
const AccountService = require('../Services/AccountService')

let getAllAccounts = (req, res) => {
    DbService.connectToDb(async (db) => {
        let accounts = await AccountService.getAllAccounts(db)
        const success = {
            "success": true,
            "message": "All accounts successfully retrieved",
            "status": 200,
            "data": accounts
        }
        res.json(success)
    })
}

let getSingleAccountById = (req, res) => {
    DbService.connectToDb(async (db) => {
        let account = await AccountService.getSingleAccountById(db, req)
        const success = {
            "success": true,
            "message": "Account successfully retrieved",
            "status": 200,
            "data": account
        }
        res.json(success)
    })
}

let deleteAccount = (req, res) => {
    DbService.connectToDb(async (db) => {
        let deletedSuccess = await AccountService.deleteAccount(db, req)
        if (deletedSuccess) {
            const success = {
                "success": true,
                "message": "Account deleted successfully",
                "status": 200
            }
            res.json(success)
        } else {
            const failure = {
                "success": false,
                "message": "Account deletion failed",
                "status": 400
            }
            res.json(failure)
        }
    })
}

let depositIntoAccount = (req, res) => {
    DbService.connectToDb(async (db) => {
        if (req.body.amount < 0) {
            const failure = {
                "success": false,
                "message": "Cannot deposit a negative integer",
                "status": 400
            }
            return res.json(failure)
        }
        if (typeof req.body.amount !== "number") {
            const failure = {
                "success": false,
                "message": "The deposit amount provided is not a number",
                "status": 400
            }
            return res.json(failure)
        }
        let depositSuccess = await AccountService.depositIntoAccount(db, req)

        if (depositSuccess) {
            const success = {
                "success": true,
                "message": "Your deposit was successfully completed",
                "status": 200
            }
            res.json(success)
        } else {
            const failure = {
                "success": false,
                "message": "Something went wrong with your withdrawal. Your account has not been affected.",
                "status": 400
            }
            res.json(failure)
        }
    })
}

let withdrawFromAccount = (req, res) => {
    DbService.connectToDb(async (db) => {
        if (req.body.amount < 0 || typeof req.body.amount !== "number") {
            const failure = {
                "success": false,
                "message": "Invalid amount value",
                "status": 400
            }
            return res.json(failure)
        }

        let withdrawalSuccess = await AccountService.withdrawFromAccount(db, req)

        if (withdrawalSuccess) {
            const success = {
                "success": true,
                "message": "Your withdrawal was successfully completed",
                "status": 200
            }
            res.json(success)
        } else {
            const failure = {
                "success": false,
                "message": "Something went wrong with your withdrawal. Your account has not been affected.",
                "status": 400
            }
            res.json(failure)
        }
    })
}

let executeAccountTransfer = (req, res) => {
    DbService.connectToDb(async (db) => {
        if (req.body.amount < 0 || typeof req.body.amount !== "number") {
            const failure = {
                "success": false,
                "message": "Invalid amount value",
                "status": 400
            }
            return res.json(failure)
        }
        const transferSuccess = await AccountService.executeAccountTransfer(db, req)
        if (transferSuccess) {
            const success = {
                "success": true,
                "message": "Your transfer was completed successfully",
                "status": 200
            }
            res.json(success)
        }
    })
}

module.exports.getAllAccounts = getAllAccounts
module.exports.getSingleAccountById = getSingleAccountById
module.exports.depositIntoAccount = depositIntoAccount
module.exports.withdrawFromAccount = withdrawFromAccount
module.exports.executeAccountTransfer = executeAccountTransfer
module.exports.deleteAccount = deleteAccount