var app = require('./config/server');

var server = app.listen(80, function(){
  console.log('Servidor online');
});

var io = require('socket.io').listen(server);

// Declarando variavel global
app.set('io', io);

io.on('connection', function(socket){
  console.log('Usuario conectou!');

  socket.on('disconnect', function(){
    console.log('Usuario desconectou!');
  });

  socket.on('msgParaServidor', function(data){
    socket.emit('msgParaCliente', data);
    // Emitindo para todos os usuarios
    socket.broadcast.emit('msgParaCliente', data);

    if(parseInt(data['apelido_atualizado']) == 0){
      socket.emit('participantes', data['apelido']);
      socket.broadcast.emit('participantes', data['apelido']);
    }
  });
});
