var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var five = require('johnny-five');
var board = new five.Board();

io.on('connection', (socket) => {
  console.log('Usuário conectado');

  board.on('ready', function() {

    var led1 = new five.Led(2);
    var led2 = new five.Led(4);
    var led3 = new five.Led(6);
    var potentiometer = new five.Sensor({
      pin: "A2",
      freq: 250,
      threshold: 5
    });
    // var motion = new five.Motion(8);

    // motion.on("calibrated", function() {
    //   console.log("calibrated");
    // });

    // motion.on("motionstart", function() {
    //   console.log('mexeu')
    //   led1.on();
    //   led2.on();
    //   led3.on();
    // });

    // motion.on("motionend", function() {
    //   console.log('parou')
    //   led1.off();
    //   led2.off();
    //   led3.off();
    // });

    var mic = new five.Sensor("A0");

    mic.on("data", function() {
      if (this.value > 1020) {
        console.log(this.value)
        led1.on();
        led2.on();
        led3.on();
      }
    });


    potentiometer.scale([0, 100]).on("data", function() {
      socket.emit('potenciometer', this.value);
      socket.broadcast.emit('potenciometer', this.value);
    });

    socket.on('turnOnlight', function(state){
      console.log()
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
});

app.use(express.static('./public/dist'));

http.listen(process.env.PORT || 8085, function(){
  console.log('listening on *:8085');
});
