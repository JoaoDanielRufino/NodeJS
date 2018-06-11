module.exports = function(app){
  app.get('/form', function(req, res){
    res.render("admin/form_add_noticia");
  });
}
