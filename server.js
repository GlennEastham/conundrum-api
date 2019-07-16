var express = require('express');

const bodyParser = require('body-parser');
app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

port = process.env.PORT || 3000;
var routes = require('./src/routes/conundrumRoutes');
routes(app);

app.listen(port);

console.log('Conundrum RESTful API server started on: ' + port);