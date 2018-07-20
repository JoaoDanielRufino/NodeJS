module.exports = function(app){
  app.get('/noticias', function(req, res){
    var connec = app.config.dbConnection();
    var noticiasModel = new app.app.models.NoticiasDAO(connec);

    noticiasModel.getNoticias(function(erro, result){
      res.render("noticias/noticias", {noticias: result})
    });
  });
}
