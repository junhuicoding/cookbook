const db = require("../models");
const Recipe = db.recipe;

// Create and Save a new Recipe
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Name can not be empty!" });
        return;
    }

    // Create a Recipe
    const recipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        tags: req.body.tags,
        cooked: req.body.cooked ? req.body.cooked : false
    });

    // Save Recipe in the database
    recipe
        .save(recipe)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Recipe. Please try again."
            });
        });
};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
    const name = req.query.title;
    var condition = name ? { title: { $regex: new RegExp(name), $options: "i" } } : {};

    Recipe.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving recipes."
            });
        });
};

// Find a single Recipe with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Recipe.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Recipe with id " + id + "not found" });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Recipe with id=" + id });
        });
};

// Update a Recipe by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty!" });
    }

    const id = req.params.id;

    Recipe.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot update Recipe with id=${id}. Maybe Recipe ID is invalid!"
                });
            } else res.send({ message: "Recipe was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Recipe with id=" + id
            });
        });
};

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Recipe.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`
                });
            } else {
                res.send({
                    message: "Recipe was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Recipe with id=" + id
            });
        });
};

// Delete all Recipes from the database.
exports.deleteAll = (req, res) => {
    Recipe.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} All recipes were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all recipes."
            });
        });
};

// Find all published Recipes
exports.findAllFavourites = (req, res) => {
    Recipe.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving recipes."
            });
        });
};