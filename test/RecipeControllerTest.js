const dbConfig = require('../src/config/db.config.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;

describe('API Tests', function() {
    before(function() {
        const db = {};
        db.mongoose = mongoose;
        db.url = dbConfig.url;
        db.recipes = require('../src/models/RecipeModel.js')(mongoose);
    });

    describe('get', function() {
        context('test', function() {
            it('should pass simple test', function() {
                expect([1, 2]).to.contain(2);
            });
        });
    });
});
