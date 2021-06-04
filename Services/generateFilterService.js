function generateFilterObject(req) {
    if (req.query.isOverdrawn === 'true') {
        return {balance: {$lt: 0}}
    }
    if (req.query.isOverdrawn === 'false') {
        return {balance: {$gte: 0}}
    }
    return {}
}

module.exports.generateFilterObject = generateFilterObject