class JogoDAO{
  constructor(connection){
    this._connection = connection;
  }

  gerarParametros(usuario){
    var dados = {
      operacao: "inserir",
      usuario: {
        usuario: usuario,
        moeda: 15,
        suditos: 10,
        temor: Math.floor(Math.random() * 1000),
        sabedoria: Math.floor(Math.random() * 1000),
        comercio: Math.floor(Math.random() * 1000),
        magia: Math.floor(Math.random() * 1000)
      },
      collection: "jogo",
      callback: function(err, result) {
        console.log("Insercao realizada");
      }
    };
    this._connection(dados);
  }

  iniciaJogo(usuario, req, res, comando_invalido){
    var dados = {
      operacao: "find",
      usuario: usuario,
      collection: "jogo",
      callback: function(err, result) {
        res.render('jogo', {img_casa: req.session.casa, jogo: result[0], comando_invalido: comando_invalido});
      }
    };
    this._connection(dados);
  }
}

module.exports = function(){
  return JogoDAO;
}
