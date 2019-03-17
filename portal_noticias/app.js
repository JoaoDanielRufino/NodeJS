var app = require('./config/server');

// Ao utilizar consign nao eh necessario fazer tais requires
/*var rotaHome = require('./app/routes/home');
rotaHome(app);

var rotaFormulario = require('./app/routes/formulario');
rotaFormulario(app);

var rotaNoticias = require('./app/routes/noticias');
rotaNoticias(app);*/

app.listen(3000, function () {
  console.log('Servidor inicializado');
});
