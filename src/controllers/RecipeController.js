/* eslint-disable max-len */
const db = require('../models/index.js');
const Recipe = db.recipes;

// Create and Save a new Recipe
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({message: 'Name cannot be empty!'});
        return;
    }

    // Create a Recipe
    const recipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        tags: req.body.tags,
        favourite: req.body.favourite ? req.body.favourite : false,
    });

    // Save Recipe in the database
    recipe
        .save(recipe)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                     'Some error occurred while creating the Recipe.',
            });
        });
};

// Retrieve all Recipes from the database. Optional parameter with Name
exports.findAll = (req, res) => {
    const name = req.query.name;
    const condition = name ?
        {name: {$regex: new RegExp(name), $options: 'i'}} : {};

    Recipe.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving recipes.',
            });
        });
};

// Retrieve all Recipes with corresponding tag from the database.
exports.findAllByTag = (req, res) => {
    const tag = req.query.tag;

    Recipe.find({tags: tag})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving recipes.',
            });
        });
};

// Retrieve all Recipes with corresponding ingredient from the database.
exports.findAllByIngredient = (req, res) => {
    const ingredient = req.query.ingredient.toString();

    Recipe.find({ingredients: ingredient})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving recipes.',
            });
        });
};

// Find a single Recipe with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Recipe.findById(id, {useFindAndModify: false})
        .then((data) => {
            if (!data) {
                res.status(404).send({message: 'Recipe with id ' + id + 'not found'});
            } else res.send(data);
        })
        .catch((err) => {
            console.log();
            res.status(500).send({message: 'Error retrieving Recipe with id=' + id});
        });
};

// Update a Recipe by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({message: 'Data to update cannot be empty!'});
    }

    const id = req.params.id;

    Recipe.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: 'Cannot update Recipe with id=${id}. Maybe Recipe ID is invalid!',
                });
            } else res.send({message: 'Recipe was updated successfully.'});
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Recipe with id=' + id,
            });
        });
};

// // Update a Recipe by the id in the request
// exports.updateFavourite = (req, res) => {
//     const id = req.params.id;
//     const favourite = req.params.favourite ? req.body.favourite : false
//     const originalFavourite = Recipe.findById(id).select("favourite");

//     Recipe.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     message: "Cannot update Recipe with id=${id}. Maybe Recipe ID is invalid!"
//                 });
//             } else res.send({ message: "Recipe was updated successfully." });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating Recipe with id=" + id
//             });
//         });
// };

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Recipe.findByIdAndRemove(id, {useFindAndModify: false})
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`,
                });
            } else {
                res.send({
                    message: 'Recipe was deleted successfully!',
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Recipe with id=' + id,
            });
        });
};

// Delete all Recipes from the database.
exports.deleteAll = (req, res) => {
    Recipe.deleteMany({})
        .then((data) => {
            res.send({
                message: `${data.deletedCount} All recipes were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while removing all recipes.',
            });
        });
};

// Find all favourited Recipes
exports.findAllFavourites = (req, res) => {
    Recipe.find({favourite: true})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving recipes.',
            });
        });
};
