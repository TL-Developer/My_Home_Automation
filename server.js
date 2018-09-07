var five = require('johnny-five');
var board = new five.Board();

board.on('ready', function(app) {
  var express = require('express');
  var app = express();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  var led1 = new five.Led(2);
  var led2 = new five.Led(4);
  var led3 = new five.Led(6);

  io.on('connection', (socket) => {
    console.log('Usuário conectado');

    socket.on('disconnect', (data) => {
      console.log('Usuário desconectou');
    });

    socket.on('turnOnlight', function(state){
      if (state) {
        led1.on();
        led2.on();
        led3.on();
      } else {
        led1.off();
        led2.off();
        led3.off();
      }
    });
  });

  http.listen(process.env.PORT || 8085, function(){
    console.log('listening on *:8085');
  });

  app.use(express.static('./public/dist'));
});
