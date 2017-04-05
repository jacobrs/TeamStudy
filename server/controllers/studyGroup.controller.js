import User from '../models/user'
import StudyGroup from '../models/studyGroup';
import Message from '../models/message';
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
    User.findOne({ cuid: req.body.cuid }).exec((err, user) => {
      if (err) {
        return res.status(500).send(err);
      }
      user.studyGroups.push(newStudyGroup);
      user.save((err, saved) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.json({ studyGroup: saved });
      });
    });
  });
}

export function addMember(req, res){
  if(!req.params.guid || !req.params.cuid){
    return res.status(403).end();
  }

  StudyGroup.findOne({ guid: req.params.guid }).exec((err, studyGroup) => {
    if (err) {
      return res.status(400).send(err);
    }

    User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
      if (err) {
        return res.status(400).send(err);
      }
      for(var i = 0; i < user.studyGroups.length; i++){
        if(user.studyGroups[i].guid == studyGroup.guid){
          return res.status(200).end();
        }
      }
      user.studyGroups.push(studyGroup);
      user.save((err, saved) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).end();
      });
    });

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
  StudyGroup.findOne({ guid: req.params.guid }).select('chatMessages').exec((err, messages) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(messages);
  });
}

export function addMessageToStudyGroup(req, res) {
  StudyGroup.findOne({ guid: req.params.guid }).exec((err, studyGroup) => {
    if (err) {
      return res.status(500).send(err);
    }    
    
    let messageCuid = req.body.messageCuid;
    let duplicate = false;

    studyGroup.chatMessages.forEach(function(element) {
      if (element.cuid = messageCuid) {
        duplicate = true;       
      }
    });

    Message.findOne({ cuid: messageCuid }).exec((err, message) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!duplicate)
        studyGroup.chatMessages.push(message);

      studyGroup.save((err, saved) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.json({ studyGroup: saved });
      }); 
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
