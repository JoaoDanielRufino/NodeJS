module.exports = function(app){
  app.get('/form', function(req, res){
    app.app.controllers.admin.form(app, req, res);
  });

  app.post('/noticias/salvar', function(req, res){
    app.app.controllers.admin.noticias_salvar(app, req, res);
  });
}
