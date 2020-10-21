// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const app = require('../server.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('API Tests', function() {
    this.timeout(50000);
    // before(function() {
    //     console.log('start test');
    // });

    // after(function() {
    //     // app.shutDown();
    // });

    describe('Add recipe', function() {
        it('should add recipe', (done) => {
            const mockRecipe1 = {
                'name': 'test 1',
                'description': 'This is dish test 1',
                'ingredients': [],
                'steps': [],
                'tags': ['easy to cook'],
                'favourite': true
            };
            console.log('start post');
            chai.request(app)
                .post('/api/recipes')
                .send(mockRecipe1)
                .end((err, res) => {
                    res.should.have.status(200);
                    console.log('post success');
                    done();
                });
        });
    });

    describe('get', function() {
        context('test', function() {
            it('should get all recipes', (done) => {
                chai.request(app)
                    .get('/api/recipes')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('Array');
                        done();
                    });
            });
        });
    });
});

const recipe1 = {
    'name': 'test 1',
    'description': 'This is dish test 1',
    'ingredients': [],
    'steps': [],
    'tags': ['easy to cook'],
    'favourite': true
};

const recipe2 = {
    'name': 'test 1',
    'description': 'This is dish test 1',
    'ingredients': ['chicken'],
    'steps': [],
    'tags': [],
    'favourite': false,
};

const recipe3 = {
    'name': 'test 1',
    'description': 'This is dish test 1',
    'ingredients': ['chicken'],
    'steps': [],
    'tags': ['easy to cook'],
    'favourite': true,
};
