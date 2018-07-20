module.exports = function(app){
  app.get('/form', function(req, res){
    res.render("admin/form_add_noticia", {validacao: {}, noticia: {}});
  });

  app.post('/noticias/salvar', function(req, res){
    var noticias = req.body;

    req.assert('titulo', 'titulo Obrigatorio').notEmpty();
    req.assert('resumo', 'resumo Obrigatorio').notEmpty();
    req.assert('resumo', 'resumo Entre 10 e 100 caracteres').len(10, 100);
    req.assert('autor', 'autor Obrigatorio').notEmpty();
    req.assert('data_noticia', 'data Obrigatorio').notEmpty().isISO8601();
    req.assert('noticia', 'noticia Obrigatorio').notEmpty();

    var erros = req.validationErrors();
    if(erros){
      res.render('admin/form_add_noticia', {validacao: erros, noticia: noticias});
      return;
    }

    var connec = app.config.dbConnection();
    var noticiasModel = new app.app.models.NoticiasDAO(connec);

    noticiasModel.salvarNoticia(noticias, function(erro, result){
      res.redirect('/noticias');
    });
  });
}
