module.exports.cadastro = function(app, req, res){
  res.render('cadastro', {validacao: {}, dadosForm: {}});
}

module.exports.cadastrar = function(app, req, res){
  let dadosForm = req.body;

  req.assert('nome', 'Nome nao pode ser vazio').notEmpty();
  req.assert('usuario', 'Usuario nao pode ser vazio').notEmpty();
  req.assert('senha', 'Senha nao pode ser vazio').notEmpty();
  req.assert('casa', 'Casa nao pode ser vazio').notEmpty();

  let erros = req.validationErrors();
  if(erros){
    res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
  }

  let connection = app.config.dbConnection;
  let usuariosDAO = new app.app.models.UsuariosDAO(connection);
  usuariosDAO.inserirUsuario(dadosForm);

  let jogoDAO = new app.app.models.JogoDAO(connection);
  jogoDAO.gerarParametros(dadosForm.usuario);

  res.send('Podemos cadastrar');
}
