import Message from '../models/message';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

export function saveMessage(req, res) {
  if (!req.body.message.messageContent || !req.body.message.author || !req.body.message.studyGroup) {
    return res.status(403).end();
  }

  const newMessage = new Message(req.body.message);

  newMessage.messageContent = sanitizeHtml(newMessage.messageContent);
  newMessage.author = sanitizeHtml(newMessage.author);
  newMessage.studyGroup = sanitizeHtml(newMessage.studyGroup);

  newMessage.cuid = cuid();

  newMessage.save((err, saved) => {
    if (err) {
      return res.status(500).send(err).end();
    }
    return res.json({ message: saved }).end();
  });
}

export function getAllMessages(req, res) {
  Message.find().sort('-dateSent').exec((err, messages) => {
    if (err) {
      return res.status(500).send(err).end();
    }
    return res.json({ messages }).end();
  });
}

export function getMessagesFromStudyGroup(req, res) {
  Message.find({ studyGroup: req.params.studyGroup }).exec((err, messages) => {
    if (err) {
      return res.status(500).send(err).end();
    }
    return res.json({ messages }).end();
  });
}

export function deleteAllMessages(req, res) {
  Message.remove().exec((err) => {
    if (err) {
      return res.status(500).send(err).end();
    }
    return res.status(200).end();
  });
}

export function deleteMessagesFromStudyGroup(req, res) {
  Message.remove({ studyGroup: req.params.studyGroup }).exec((err) => {
    if (err) {
      return res.status(500).send(err).end();
    }
    return res.status(200).end();
  });
}
