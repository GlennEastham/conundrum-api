require("./src/database/connection");

var express = require('express');
var db = require('./models');



const bodyParser = require('body-parser'),
app = express();
port = process.env.PORT || 3000;
app.listen(port, function() {
  db.sequelize.sync();
});

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'Conundrum API',
    version: '1.0.0',
    description: 'Conundrum endpoints'
  },
  host: 'localhost:3000',
  basePath: '/',
  explorer: false
}

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
app.get('/api-docs.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var routes = require('./src/routes/conundrumRoutes');
routes(app);

console.log('Conundrum RESTful API server started on: ' + port);