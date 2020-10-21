/* eslint-disable no-unused-vars */
const dbConfig = require('../src/config/db.config.js');

const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.recipes = require('../src/models/RecipeModel.js')(mongoose);
const Recipe = db.recipes;

describe('API Tests', function() {
    before(function() {

    });

    describe('get', function() {
        context('test', function() {
            it('should pass simple test', function() {
                mockRecipe1 = recipe1;
                expect([1, 2]).to.contain(2);
            });
        });
    });
});

const recipe1 = new Recipe({
    name: 'test 1',
    description: 'This is dish test 1',
    ingredients: [],
    steps: [],
    tags: ['easy to cook'],
    favourite: true,
});

const recipe2 = new Recipe({
    name: 'test 1',
    description: 'This is dish test 1',
    ingredients: ['chicken'],
    steps: [],
    tags: [],
    favourite: false,
});

const recipe3 = new Recipe({
    name: 'test 1',
    description: 'This is dish test 1',
    ingredients: ['chicken'],
    steps: [],
    tags: ['easy to cook'],
    favourite: true,
});
