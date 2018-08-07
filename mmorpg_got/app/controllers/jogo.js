module.exports.jogo = function(app, req, res){
  if(!req.session.autorizado)
    res.render('index', {validacao: {}});
  else{
    let msg = '';
    if(req.query.msg != ''){
      msg = req.query.msg;
    }
    let connection = app.config.dbConnection;
    let jogoDAO = new app.app.models.JogoDAO(connection);

    jogoDAO.iniciaJogo(req.session.usuario, req, res, msg);
  }
}

module.exports.sair = function(app, req, res){
  req.session.destroy(function(err){
    res.render('index', {validacao: {}});
  });
}

module.exports.suditos = function(app, req, res){
  if(!req.session.autorizado)
    res.render('index', {validacao: {}});

  res.render('aldeoes');
}

module.exports.pergaminhos = function(app, req, res){
  if(!req.session.autorizado)
    res.render('index', {validacao: {}});

  res.render('pergaminhos');
}

module.exports.ordenar_acao_sudito = function(app, req, res){
  if(!req.session.autorizado)
    res.render('index', {validacao: {}});

  let dadosForm = req.body;

  req.assert('acao', 'Acao nao pode ser vazio').notEmpty();
  req.assert('quantidade', 'Quantidade nao pode ser vazio').notEmpty();

  let erros = req.validationErrors();
  if(erros){
    res.redirect('jogo?msg=A');
  }

  let connection = app.config.dbConnection;
  let jogoDAO = new app.app.models.JogoDAO(connection);

  dadosForm.usuario = req.session.usuario;
  jogoDAO.acao(dadosForm);

  res.redirect('jogo?msg=B');
}
