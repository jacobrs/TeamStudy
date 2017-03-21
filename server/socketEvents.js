import Message from './models/message';
import cuid from 'cuid';

exports = module.exports = function (io) {
  io.sockets.on('connection', function (socket) {
    let existingMessages = Message.find().sort('-dateSent');
    existingMessages.limit(10).exec((err, messages) => {
      if (err) {
        throw err;
      }
      else {
        socket.emit('FetchExistingMessages', messages);
      }
    });
    
    // user opens chat event handler
    socket.on('UserSignedIn', function (user) {
      socket.nickname = user;
    });

    // new message event handler
    socket.on('SaveMessage', function (data) {
      const newMessage = new Message();
      newMessage.messageContent = data.message;
      newMessage.author = socket.nickname;
      newMessage.studyGroup = data.studyGroup;
      newMessage.cuid = cuid();

      newMessage.save(function(err) {
        if (err) {
          throw err;
        }
        else {
          io.sockets.emit('UpdateMessages', { message: data.message, user: socket.nickname });
        }
      });
    });

    // disconnect event handler
    socket.on('disconnect', function () {

    });

  });
};