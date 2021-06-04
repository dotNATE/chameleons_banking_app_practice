const generateFilterObject = require('../Services/generateFilterService')

describe('Success tests for the generateFilterObject function', () => {
    test('success1_ isOverdrawn = true added to GET request', () => {
        expect(generateFilterObject.generateFilterObject({query: {isOverdrawn: 'true'}})).toStrictEqual({balance: {$lt: 0}})
    })
    test('success2_ isOverdrawn = false added to GET request', () => {
        expect(generateFilterObject.generateFilterObject({query: {isOverdrawn: 'false'}})).toStrictEqual({balance: {$gte: 0}})
    })
    test('success3_ no queries added to GET request', () => {
        expect(generateFilterObject.generateFilterObject({query: {}})).toStrictEqual({})
    })
})

describe('Malformed tests for the generateFilterObject function', () => {
    test('malformed1_ no args passed to function call', () => {
        expect(() => {generateFilterObject.generateFilterObject()}).toThrow("Cannot read property 'query' of undefined")
    })
})