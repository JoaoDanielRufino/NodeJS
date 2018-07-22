module.exports.iniciaChat = function(app, req, res){
  let dadosForm = req.body;

  req.assert('apelido', 'Apelido nao pode ser vazio!!').notEmpty();

  let erros = req.validationErrors();
  if(erros){
    res.render('index', {validacao: erros});
  }

  res.render('chat');
}
