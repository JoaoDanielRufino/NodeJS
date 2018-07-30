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
    default:
      break;
  }
}

module.exports = function() {
  return connMongoDB;
};
