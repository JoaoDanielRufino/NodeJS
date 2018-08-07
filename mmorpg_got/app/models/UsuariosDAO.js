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
        console.log("Insercao realizada");
      }
    };
    this._connection(dados);
  }

  autenticar(usuario, req, res){
    var dados = {
      operacao: "find",
      usuario: usuario,
      collection: "usuarios",
      callback: function(err, result) {
        if(result[0] != undefined){
          req.session.autorizado = true; // Criando variaveis de session
          req.session.usuario = result[0].usuario;
          req.session.casa = result[0].casa;
        }
        if(req.session.autorizado){
          res.redirect('jogo');
        }
        else{
          res.render('index', {validacao: [{msg: 'Usuario ou senha incorretos!!'}]});
        }
      }
    };
    this._connection(dados);
  }
}

module.exports = function(){
  return UsuariosDAO;
}
