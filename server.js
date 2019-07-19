require('./src/database/connection')
require('./src/models')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const bodyParser = require('body-parser')
const app = express()
const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

app.listen(port)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let host

if (env === 'development') {
  host = 'localhost:3000'
} else {
  host = 'conundrum-api.herokuapp.com'
}

const swaggerDefinition = {
  info: {
    title: 'Conundrum API',
    version: '1.0.0',
    description: 'Conundrum endpoints'
  },
  host: host,
  basePath: '/'
}

const swaggerUIOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
}
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options)
app.get('/api-docs.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})
var routes = require('./src/routes/conundrumRoutes')
routes(app)

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUIOptions))

console.log('Conundrum RESTful API server started on: ' + port)
