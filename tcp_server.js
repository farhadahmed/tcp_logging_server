'use strict';

var net = require('net');
var uuid = require('uuid');
var fs = require('fs');

//The socket is a duplex stream
var server = net.createServer(function(socket) {
  var log = '';
  var uuidString = uuid.v1();
  socket.on('data', function(data) {
    log += data;
    socket.end();
    console.log(data.toString());
  });

  socket.on('end', function() {
    fs.writeFile(__dirname + '/logs/' + uuidString, log);
    console.log('new log created.');
  });
});

server.listen(3000, function() {
  console.log('server listening at 3000');
});
