module.exports = function(app){
  app.get('/noticia', function(req, res){
    var connec = app.config.dbConnection();
    var noticiasModel = app.app.models.noticiasModel;

    noticiasModel.getNoticia(connec, function(erro, result){
      res.render("noticias/noticia", {noticia: result})
    });
  });
}
