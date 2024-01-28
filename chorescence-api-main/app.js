var express = require('express'),
  swaggerJsdoc = require('swagger-jsdoc'),
  swaggerUi = require('swagger-ui-express');

const app = express();

// Fix issues with CORS error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

// Swagger Tings
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '0.1.0',
      title: 'Chorescence Express API with Swagger',
      description: 'This is a the backend API application for Chorescence made with Express and documented with Swagger'
    }
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);
// Import routes
// const indexRoute = require("./routes/index.js");
const userRoute = require('./routes/user.js');
const tasksRoute = require('./routes/tasks.js');
const groupRoute = require('./routes/group.js');
const loginRoute = require('./routes/login.js');
const signupRoute = require('./routes/signup.js');

// Create routes
app.use('/user', userRoute);
app.use('/tasks', tasksRoute);
app.use('/group', groupRoute);
app.use('/login', loginRoute);
app.use('/signup', signupRoute);

// Swagger Route
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
); 

// Handling Index Route
app.get('/', (req, res) => {
  res.status(400).send({ error: 'Bad Request - Bad URL' });
});

module.exports = app;
