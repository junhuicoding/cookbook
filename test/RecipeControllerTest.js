// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const app = require('../server.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('API Tests', function () {
    beforeEach(function () {
        chai.request(app).post('/api/recipes').send(mockRecipe1).end();
        chai.request(app).post('/api/recipes').send(mockRecipe2).end();
        chai.request(app).post('/api/recipes').send(mockRecipe3).end();
    });

    afterEach(function () {
        // Clear database after each test is done
        chai.request(app).delete('/api/recipes').send().end();
    });

    describe('POST', function () {
        it('Should add recipe without error', (done) => {
            chai.request(app)
                .post('/api/recipes')
                .send(mockRecipe1)
                .end((err, res) => {
                    res.should.have.status(200);
                    chai.request(app).delete('/api/recipes');
                    done();
                });
        });

        it('Should return 400 error when adding empty recipe', (done) => {
            chai.request(app)
                .post('/api/recipes')
                .send({})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

    });

    describe('GET ', function () {
        it('Should get all recipes', (done) => {
            chai.request(app)
                .get('/api/recipes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    chai.expect(res.body).to.have.lengthOf(3);
                    done();
                });
        });

        it('Should get 1 recipe by id correctly', (done) => {
            let recipeId;
            chai.request(app)
                .get('/api/recipes')
                .end((err, res) => {
                    recipeId = res.body[0].id;
                    chai.request(app)
                        .get('/api/recipes/' + String(recipeId))
                        .end((err, res) => {
                            res.should.have.status(200);
                            chai.expect(String(res.body.id)).to.equal(String(recipeId));
                            done();
                        });
                });
        });

        it('Should return 404 when trying to retreive by invalid id', (done) => {
            chai.request(app)
                .get('/api/recipes/' + invalidId)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('Should get all favourite recipes', (done) => {
            chai.request(app)
                .get('/api/recipes/favourite')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    chai.expect(res.body).to.have.lengthOf(2);
                    done();
                });
        });

        it('Should get all recipes by ingredients correctly', (done) => {
            chai.request(app)
                .get('/api/recipes/ingredient')
                .query({ ingredient: 'chicken' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    chai.expect(res.body).to.have.lengthOf(2);
                    done();
                });
        });

        it('Should get all recipes by tag correctly', (done) => {
            chai.request(app)
                .get('/api/recipes/tag')
                .query({ tag: 'hard to cook' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    chai.expect(res.body).to.have.lengthOf(1);
                    done();
                });
        });
    });

    describe('PUT ', function () {
        let recipeId;
        let recipe;
        let originalName;
        it('Should edit recipe by id correctly', (done) => {
            chai.request(app)
                .get('/api/recipes')
                .end((err, res) => {
                    recipeId = res.body[0].id;
                    recipe = res.body[0];
                    originalName = res.body[0].name;
                    recipe.name = 'changed name';
                    chai.request(app)
                        .put('/api/recipes/' + String(recipeId))
                        .send(recipe)
                        .end((err, res1) => {
                            res1.should.have.status(200);
                            chai.request(app)
                                .get('/api/recipes/' + String(recipeId))
                                .send(recipe)
                                .end((err, res2) => {
                                    res2.should.have.status(200);
                                    chai.expect(res2.body.name).to.equal('changed name')
                                    done();
                                });
                        });
                });
        });

        it('Should return 404 when trying to edit a recipe with invalid id', (done) => {
            chai.request(app)
                .put('/api/recipes/' + invalidId)
                .send(mockRecipe1)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

    });

    describe('DELETE ', function () {
        let recipeId;
        let recipe;
        let originalName;
        it('Should delete recipe by id correctly', (done) => {
            chai.request(app)
                .get('/api/recipes')
                .end((err, res) => {
                    recipeId = res.body[0].id;
                    chai.request(app)
                        .delete('/api/recipes/' + String(recipeId))
                        .send(recipe)
                        .end((err, res1) => {
                            res.should.have.status(200);
                            chai.request(app)
                                .get('/api/recipes/' + String(recipeId))
                                .send(recipe)
                                .end((err, res1) => {
                                    res1.should.have.status(404);
                                    done();
                                });
                        });
                });
        });

        it('Should return 404 when trying to delete a recipe with invalid id', (done) => {
            chai.request(app)
                .delete('/api/recipes/' + invalidId)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

    });
});

const mockRecipe1 = {
    'name': 'test 1',
    'description': 'This is dish test 1',
    'ingredients': [],
    'steps': [],
    'tags': [],
    'favourite': true
};
const mockRecipe2 = {
    'name': 'test 2',
    'description': 'This is dish test 2',
    'ingredients': ['chicken'],
    'steps': ['Cook chicken'],
    'tags': ['easy to cook'],
    'favourite': false
};
const mockRecipe3 = {
    'name': 'test 3',
    'description': 'This is dish test 3',
    'ingredients': ['chicken', 'rice'],
    'steps': ['Cook Chicken', 'Cook rice', 'Put chicken on rice and serve'],
    'tags': ['hard to cook'],
    'favourite': true
};

const invalidId = '111111111111111111111111';
