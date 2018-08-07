var mongo = require("mongodb").MongoClient;
var assert = require("assert");

const url = "mongodb://localhost:27017";
const dbName = "got";

var connMongoDB = function(dados) {
  mongo.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    query(db, dados);
    client.close();
  });
};

function query(db, dados) {
  var collection = db.collection(dados.collection);
  switch (dados.operacao) {
    case "inserir":
      collection.insertOne(dados.usuario, dados.callback);
      break;
    case "find":
      collection.find(dados.usuario).toArray(dados.callback);
      break;
    case "update":
      collection.update({usuario: dados.usuario}, {$inc: {moeda: dados.moedas}});
      break;
    case "find-perg":
      collection.find({usuario: dados.usuario, acao_termina_em: {$gt: new Date().getTime()}}).toArray(dados.callback);
      break;
    case "delete":
      collection.remove(dados.usuario, dados.callback);
      break;
    default:
      break;
  }
}

module.exports = function() {
  return connMongoDB;
};
