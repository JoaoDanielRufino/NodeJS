module.exports.noticias = function(app, req, res){
  var connec = app.config.dbConnection();
  var noticiasModel = new app.app.models.NoticiasDAO(connec);

  noticiasModel.getNoticias(function(erro, result){
    res.render("noticias/noticias", {noticias: result})
  });
}

module.exports.noticia = function(app, req, res){
  var connec = app.config.dbConnection();
  var noticiasModel = new app.app.models.NoticiasDAO(connec);
  var id_noticia = req.query['id_noticia'];

  noticiasModel.getNoticia(id_noticia, function(erro, result){
    res.render("noticias/noticia", {noticia: result})
  });
}
