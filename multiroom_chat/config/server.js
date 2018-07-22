var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();

// Configurando a view engine para ejs
app.set('view engine', 'ejs');
// Dizendo a localidade das views
app.set('views', './app/views');

// Configurando middleware express.static
app.use(express.static('./app/public'));
// Configurando o middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));
// Configurando o middleware express-validator
app.use(expressValidator());

// Efetuando o autoload das rotas, models e controllers para o objeto app
consign()
        .include('app/routes')
        .then('app/models')
        .then('app/controllers')
        .into(app);

module.exports = app;
