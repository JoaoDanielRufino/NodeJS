module.exports = function(app){
  app.get('/noticias', function(req, res){
    var connec = app.config.dbConnection();
    var noticiasModel = app.app.models.noticiasModel;

    noticiasModel.getNoticias(connec, function(erro, result){
      res.render("noticias/noticias", {noticias: result})
    });
  });
}
