var express = require('express');
const bodyParser = require('body-parser'),
app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info:{
    title: 'Conundrum API',
    version: '1.0.0',
    description: 'Conundrum endpoints'
  }, 
  host: 'localhost:3000',
  basePath: '/'
}

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

port = process.env.PORT || 3000;
var routes = require('./src/routes/conundrumRoutes');
routes(app);

app.listen(port);

console.log('Conundrum RESTful API server started on: ' + port);