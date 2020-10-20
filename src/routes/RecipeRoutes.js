module.exports = app => {
    const recipes = require("../controllers/RecipeController.js");
  
    var router = require("express").Router();
  
    // Create a new Recipe
    router.post("/", recipes.create);
  
    // Retrieve all Recipe
    router.get("/", recipes.findAll);
  
    // Retrieve all favourited Recipe
    router.get("/favourite", recipes.findAllFavourites);

    // Retrieve all favourited Recipe
    router.get("/tag", recipes.findAllByTag);

    // Retrieve all favourited Recipe
    router.get("/ingredient", recipes.findAllByIngredient);
  
    // Retrieve a single Recipe with id
    router.get("/:id", recipes.findOne);
  
    // Update a Recipe with id
    router.put("/:id", recipes.update);

    // // Update a Recipe with id as favourite
    // router.put("favourite/:id", recipes.updateFavourite)
  
    // Delete a Recipe with id
    router.delete("/:id", recipes.delete);
  
    // Create a new Recipe
    router.delete("/", recipes.deleteAll);
  
    app.use('/api/recipes', router);
  };
