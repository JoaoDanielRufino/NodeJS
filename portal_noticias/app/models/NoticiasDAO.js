function NoticiasDAO(connection){
  this._connection = connection;
}

NoticiasDAO.prototype.getNoticias = function(callBack){
  this._connection.query('select * from portal_noticias order by data_criacao desc', callBack);
}

NoticiasDAO.prototype.getNoticia = function(id_noticia, callBack){
  this._connection.query('select * from portal_noticias where id_noticia = ' + id_noticia, callBack);
}

NoticiasDAO.prototype.salvarNoticia = function(noticias, callBack){
  console.log(noticias);
  this._connection.query('insert into portal_noticias set ?', noticias, callBack);
}

NoticiasDAO.prototype.getUltimasNoticias = function(callBack){
  this._connection.query('select * from portal_noticias order by data_criacao desc limit 5', callBack);
}

module.exports = function(){
  return NoticiasDAO;
}
