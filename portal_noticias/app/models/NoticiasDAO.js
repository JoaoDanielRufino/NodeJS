function NoticiasDAO(connection){
  this._connection = connection;
}

NoticiasDAO.prototype.getNoticias = function(callBack){
  this._connection.query('select * from portal_noticias', callBack);
}

NoticiasDAO.prototype.getNoticia = function(callBack){
  this._connection.query('select * from portal_noticias where id_noticia = 1', callBack);
}

NoticiasDAO.prototype.salvarNoticia = function(noticias, callBack){
  console.log(noticias);
  this._connection.query('insert into portal_noticias set ?', noticias, callBack);
}

module.exports = function(){
  return NoticiasDAO;
}
