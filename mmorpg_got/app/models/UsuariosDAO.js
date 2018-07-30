class UsuariosDAO{
  constructor(connection){
    this._connection = connection;
  }

  inserirUsuario(usuario){
    var dados = {
      operacao: "inserir",
      usuario: usuario,
      collection: "usuarios",
      callback: function(err, result) {
        res.send("olá Marilene");
      }
    };
    this._connection(dados);
  }
}

module.exports = function(){
  return UsuariosDAO;
}
