var expect = require('chai').expect;

describe('API Tests', function () {

    context('test', function () {
        it('should pass simple test', function() {
            expect([1, 2]).to.contain(2);
        })  
    })
})