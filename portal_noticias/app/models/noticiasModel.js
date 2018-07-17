module.exports = function(){
  this.getNoticias = function(connection, callBack){
    connection.query('select * from portal_noticias', callBack);
  }

  this.getNoticia = function(connection, callBack){
    connection.query('select * from portal_noticias where id_noticia = 1', callBack);
  }

  return this;
}
