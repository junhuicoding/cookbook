const mongoose = require('mongoose');

const db = {};
db.mongoose = mongoose;
db.recipes = require('./RecipeModel.js')(mongoose);

module.exports = db;
