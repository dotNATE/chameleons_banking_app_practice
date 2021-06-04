function generateFilterObject(req) {
    let filter = {}
    if (req.query.isOverdrawn === 'true') {
        filter = {balance: {$lt: 0}}
    }
    if (req.query.isOverdrawn === 'false') {
        filter = {balance: {$gte: 0}}
    }
    return filter
}

module.exports.generateFilterObject = generateFilterObject