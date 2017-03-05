import StudyGroup from '../models/studyGroup';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

export function getStudyGroups(req, res) {
  StudyGroup.find().sort('-dateAdded').exec((err, groups) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ groups });
  });
}

export function createStudyGroup(req, res) {
  if (!req.body.studyGroup.groupName || !req.body.studyGroup.course || !req.body.studyGroup.teacher ||
    !req.body.studyGroup.description) {
    return res.status(403).end();
  }

  const newStudyGroup = new StudyGroup(req.body.studyGroup);

  newStudyGroup.groupName = sanitizeHtml(newStudyGroup.groupName);
  newStudyGroup.course = sanitizeHtml(newStudyGroup.course);
  newStudyGroup.teacher = sanitizeHtml(newStudyGroup.teacher);
  newStudyGroup.description = sanitizeHtml(newStudyGroup.description);

  newStudyGroup.guid = cuid();
  newStudyGroup.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ studyGroup: saved });
  });
}

export function getStudyGroup(req, res) {
  StudyGroup.findOne({ guid: req.params.guid }).exec((err, studyGroup) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ studyGroup });
  });
}

export function deleteStudyGroup(req, res) {
  StudyGroup.findOne({ guid: req.params.guid }).exec((err, studyGroup) => {
    if (err) {
      return res.status(500).send(err);
    }
    studyGroup.remove(() => {
      return res.status(200).end();
    });
  });
}

export function getStudyGroupMessages(req, res) {
  StudyGroup.findOne({ guid: req.params.guid }).select('chatMessages').exec((err, chatMessages) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ chatMessages });
  });
}

export function addMessageToStudyGroup(req, res) {
  const newMessage = sanitizeHtml(req.body.chatMessage);

  StudyGroup.findOne({ guid: req.params.guid }).exec((err, studyGroup) => {
    if (err) {
      return res.status(500).send(err);
    }

    studyGroup.chatMessages.push(newMessage);

    studyGroup.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json({ studyGroup });
    });
  });
}

export function deleteStudyGroupMessages(req, res) {
  StudyGroup.findOne({ guid: req.params.guid }).exec((err, studyGroup) => {
    if (err) {
      return res.status(500).send(err);
    }

    studyGroup.chatMessages = [];

    studyGroup.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json({ studyGroup });
    });
  });
}
