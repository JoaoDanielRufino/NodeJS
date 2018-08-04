module.exports.index = function(app, req, res){
  res.render('index', {validacao: {}});
}

module.exports.autenticar = function(app, req, res){
  let dadosForm = req.body;

  req.assert('usuario', 'Usuario nao pode ser vazio').notEmpty();
  req.assert('senha', 'Senha nao pode ser vazio').notEmpty();

  let erros = req.validationErrors();
  if(erros){
    res.render('index', {validacao: erros});
  }

  res.send('Tudo certo');

}
