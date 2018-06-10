var http = require('http');

var server = http.createServer(function(req, res){
  var categoria = req.url;

  if(categoria == '/tec')
    res.end("<html><body>Portal de noticias de Tecnologia</body></html>");
  else if(categoria == '/moda')
    res.end("<html><body>Portal de noticias de Moda</body></html>");
  else
    res.end("<html><body>Portal de noticias</body></html>");
});

server.listen(3000);
