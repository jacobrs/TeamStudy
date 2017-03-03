import Message from '../models/message';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

export function getAllMessages(req, res) {
  Message.find().sort('-dateSent').exec((err, messages) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ messages });
  });
}

// get the ten most recent messages?

export function sendMessage(req, res) {
  // debug
  console.log(req.body.message);

  if (!req.body.message.messageContent) {
    return res.status(403).end();
  }

  const newMessage = new Message(req.body.message);

  // sanitize inputs
  newMessage.messageContent = sanitizeHtml(newMessage.messageContent);

  // generate cuid
  newMessage.cuid = cuid();

  // debug
  console.log(newMessage);

  // save to server
  newMessage.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ message: saved });
  });
}

// get specific message?
// delete message?
