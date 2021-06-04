const JSONResponseService = require('../Services/JSONResponseService')

describe('Success tests for the generateSuccessResponse function', () => {
    test('success1_ isOverdrawn = true added to GET request', () => {
        expect(JSONResponseService.generateSuccessResponse()).toStrictEqual({
            "success": true,
            "message": "",
            "status": 200
        })
    })
})

describe('Success tests for the generateFailureResponse function', () => {
    test('success1_ isOverdrawn = true added to GET request', () => {
        expect(JSONResponseService.generateFailureResponse()).toStrictEqual({
            "success": false,
            "message": "",
            "status": 400
        })
    })
})