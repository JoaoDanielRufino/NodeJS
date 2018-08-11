var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectId;
var multiparty = require('connect-multiparty');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multiparty());
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.listen(8080);

console.log('Servidor online 2');

var db = new mongodb.Db('instagram', new mongodb.Server('localhost', 27017, {}), {});

app.get('/', function(req, res){
  res.send({msg: 'Ola'});
});

app.post('/api', function(req, res){
  let date = new Date();
  let timestamp = date.getTime();

  let url_imagem = timestamp + '_' + req.files.arquivo.originalFilename;
  let path_origem = req.files.arquivo.path;
  let path_destino = './uploads/' + url_imagem;

  fs.rename(path_origem, path_destino, function(err){
    if(err){
      res.status(500).json(err);
    }
    else{
      let dados = {url_imagem: url_imagem, titulo: req.body.titulo};
      db.open(function(err, mongoclient){
        mongoclient.collection('postagens', function(err, collection){
          collection.insert(dados, function(err, result){
            if(err){
              res.json(err);
            }
            else{
              res.json({status: 'sucesso'});
            }
            mongoclient.close();
          });
        });
      });
    }
  });
});

app.get('/api', function(req, res){
  db.open(function(err, mongoclient){
    mongoclient.collection('postagens', function(err, collection){
      collection.find().toArray(function(err, result){
        if(err){
          res.json(err);
        }
        else{
          res.json(result);
        }
        mongoclient.close();
      });
    });
  });
});

app.get('/uploads/:imagem', function(req, res){
  let img = req.params.imagem;
  fs.readFile('./uploads/' + img, function(err, conteudo){
    if(err){
      res.status(400).json(err);
    }
    else{
      res.writeHead(200, {'content-type': 'image/jpg'});
      res.end(conteudo);
    }
  });
});

app.get('/api/:id', function(req, res){
  db.open(function(err, mongoclient){
    mongoclient.collection('postagens', function(err, collection){
      collection.find(objectId(req.params.id)).toArray(function(err, result){
        if(err){
          res.json(err);
        }
        else{
          res.json(result);
        }
        mongoclient.close();
      });
    });
  });
});

app.put('/api/:id', function(req, res){
  db.open(function(err, mongoclient){
    mongoclient.collection('postagens', function(err, collection){
      collection.update({_id: objectId(req.params.id)}, {$push: {comentarios: {id_comentario: new objectId(), comentario: req.body.comentario}}}, {}, function(err, result){
        if(err){
          res.json(err);
        }
        else{
          res.json(result);
        }
        mongoclient.close();
      });
    });
  });
});

app.delete('/api/:id', function(req, res){
  db.open(function(err, mongoclient){
    mongoclient.collection('postagens', function(err, collection){
      collection.update({}, {$pull: {comentarios: {id_comentario: objectId(req.params.id)}}}, {multi: true}, function(err, result){
        if(err){
          res.json(err);
        }
        else{
          res.json(result);
        }
        mongoclient.close();
      });
    });
  });
});
