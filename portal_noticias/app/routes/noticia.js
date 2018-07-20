module.exports = function(app){
  app.get('/noticia', function(req, res){
    var connec = app.config.dbConnection();
    var noticiasModel = new app.app.models.NoticiasDAO(connec);

    noticiasModel.getNoticia(function(erro, result){
      res.render("noticias/noticia", {noticia: result})
    });
  });
}
