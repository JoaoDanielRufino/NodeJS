var dbConnection = require('../../config/dbConnection');

module.exports = function(app){
  var connec = dbConnection();
  
  app.get('/noticias', function(req, res){
    connec.query('select * from portal_noticias', function(erro, result){
      res.render("noticias/noticias", {noticias: result})
    });
  });
}
