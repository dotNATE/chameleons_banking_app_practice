const AccountController = require('../Controllers/AccountController')

let routes = (app) => {
    app.get('/accounts', AccountController.getAllAccounts)
    app.get('/accounts/:id', AccountController.getSingleAccountById)
    app.post('/accounts', AccountController.insertNewAccount)
    app.delete('/accounts', AccountController.deleteAccount)
    app.put('/deposits', AccountController.depositIntoAccount)
    app.put('/withdrawals', AccountController.withdrawFromAccount)
    app.put('/transfers', AccountController.executeAccountTransfer)
}

module.exports = routes