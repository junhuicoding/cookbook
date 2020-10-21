const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
db.recipes = require('./RecipeModel')(mongoose);

module.exports = db;
