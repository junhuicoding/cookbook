# Cookbook
[![Build Status](https://travis-ci.com/junhuicoding/cookbook.svg?branch=master)](https://travis-ci.com/junhuicoding/cookbook)

## Quick Setup and Usage:
By default, the backend will run on localhost:8080 and the frontend on localhost:3000.

First, clone the repositories from github with the links above.

Ensure that an instance of mongodb is running (on port 27017):

`mongod`

To run the backend with npm:

`npm start`

Or with nodemon:

`nodemon start`

To run suite of tests locally:

`npm test`

To run the frontend:

`npm start`

To test the backend API with Postman, import the collection of preconfigured test from the collection json located in the folder “Postman Tests”. Edit the fields as desired.

## Guide

The backend is built with express and mongoose, using node js and Mongo DB as a NoSQL database.

Data structure of a recipe:

•	name: String,

•	description: String

•	ingredients: [String]

•	steps: [String]

•	tags: [String]

•	favourite: Boolean

## API Documentation

### Adding a new recipe:

`POST /api/recipes`

Sends a JSON object that contains the information of the recipe as shown above in data structure. The name field is compulsory, and the other fields are optional and can be empty or even left out. Will add a new recipe with the provided information. Returns a 200 if successful, and a 400 if the name field is empty, together with an error message `"Name cannot be empty!"`.

### Retrieve a single recipe in cookbook:

`GET /api/recipes/:id `

Retrieves the recipe with desired id from the cookbook. Returns `404` with not found error message if there is no recipe with that id.

### Retrieve all recipes in cookbook:

`GET /api/recipes `

Retrieves an array of all recipes available in the cookbook. Returns an empty array if there are no recipes available.

### Find and retrieve recipes by name:

`GET /api/recipes?name=<optional parameter here> `

It can also accept an optional parameter to search the names of all recipes and only return those that contains the desired name.

### Retrieve all favourited recipes in cookbook:

`GET /api/recipes/favourite `

Retrieves an array of all recipes favourited (true for favourite field). Returns an empty array if there are no recipes available.

### Find all tagged in cookbook:

`GET /api/recipes/tag `

Retrieves an array of all recipes that contains the desired tag in its array of tags. Returns an empty array if there are no recipes available.

### Find by ingredient in cookbook:

`GET /api/recipes/ingredient `

Retrieves an array of all recipes that contains the desired ingredient in its list of ingredients. Returns an empty array if there are no recipes available.

### Update recipe with id:

`PUT /api/recipes/:id `

Updates the recipe with chosen id with the JSON object sent to it. Returns 404 if recipe with id cannot be found, 400 if the required field, name, in the sent JSON is empty, and 200 if successful and a success message `“Recipe was updated successfully”`.

### Delete a single recipe in cookbook:

`DELETE /api/recipes/:id `

Delete a single recipe in the cookbook. Returns 404 with not found error message if there is no recipe with that id and returns the data of the recipe deleted.

### Delete a single recipe in cookbook:

`DELETE /api/recipes/:id `

Delete all recipes available in the cookbook. Returns a message with the number of recipes deleted.

