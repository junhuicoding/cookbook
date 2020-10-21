const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

require('./src/routes/RecipeRoutes')(app);

// set port, listen for requests
const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


const db = require('./src/models');
db.mongoose
    .connect(config.DBHost, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    });

module.exports = function shutDown() {
    db.mongoose.connection.close();
};

module.exports = app;
