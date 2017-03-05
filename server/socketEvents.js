exports = module.exports = function (io) {
  /*
    on() is an event handler
    emit() sends and event
    'connection' and 'disconnect' are predifined event types found in documentation
  */
  // io.on('connection', function(socket) {...});
  io.sockets.on('connection', function (socket) {
    console.log('A user has connected');

    // Catch event from client-side
    socket.on('SendMessageToServerEvent', function (data) {
      // Send event to client-side
      io.sockets.emit('UpdateChatMessages', data);
    });

    socket.on('disconnect', function () {
      console.log('A user has disconnected');
    });
  });
};
