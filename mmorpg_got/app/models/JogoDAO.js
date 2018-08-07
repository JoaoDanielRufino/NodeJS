var objectID = require('mongodb').ObjectId;

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

  iniciaJogo(usuario, req, res, msg){
    var dados = {
      operacao: "find",
      usuario: usuario,
      collection: "jogo",
      callback: function(err, result) {
        res.render('jogo', {img_casa: req.session.casa, jogo: result[0], msg: msg});
      }
    };
    this._connection(dados);
  }

  acao(acao){
    let date = new Date();
    let tmp = null;

    switch(parseInt(acao.acao)){
      case 1:
        tmp = 1 * 60 * 60000;
        break;
      case 2:
        tmp = 2 * 60 * 60000;
        break;
      case 3:
        tmp = 5 * 60 * 60000;
        break;
      case 4:
        tmp = 5 * 60 * 60000;
        break;
    }
    acao.acao_termina_em = date.getTime() + tmp;

    var dados = {
      operacao: "inserir",
      usuario: acao,
      collection: "acao",
      callback: function(err, result) {
        console.log('Insercao realizada');
      }
    };
    this._connection(dados);

    let moedas = null;
    switch(parseInt(acao.acao)){
      case 1:
        moedas = -2 * acao.quantidade;
        break;
      case 2:
        moedas = -3 * acao.quantidade;
        break;
      case 3:
        moedas = -1 * acao.quantidade;
        break;
      case 4:
        moedas = -1 * acao.quantidade;
        break;
    }

    var dados2 = {
      operacao: "update",
      usuario: acao.usuario,
      moedas: moedas,
      collection: "jogo"
    };
    this._connection(dados2);
  }

  getAcoes(usuario, res){
    var dados = {
      operacao: "find-perg",
      usuario: usuario,
      collection: "acao",
      callback: function(err, result) {
        res.render('pergaminhos', {acoes: result});
      }
    };
    this._connection(dados);
  }

  revogarAcao(id, res){
    var dados = {
      operacao: "delete",
      usuario: objectID(id),
      collection: "acao",
      callback: function(err, result) {
        res.redirect('jogo?msg=D');
      }
    };
    this._connection(dados);
  }
}

module.exports = function(){
  return JogoDAO;
}
