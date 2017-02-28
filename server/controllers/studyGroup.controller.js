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
  console.log(req.body.studyGroup);
  if (!req.body.studyGroup.groupName || !req.body.studyGroup.course || !req.body.studyGroup.teacher ||
    !req.body.studyGroup.description) {
    return res.status(403).end();
  }

  const newStudyGroup = new StudyGroup(req.body.studyGroup);

  // Let's sanitize inputs
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
  StudyGroup.findOne({ guid: req.params.guid }).exec((err, studyGroups) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ studyGroups });
  });
}

export function deleteStudyGroup(req, res) {
  StudyGroup.findOne({ guid: req.params.guid }).exec((err, studyGroups) => {
    if (err) {
      return res.status(500).send(err);
    }
    studyGroups.remove(() => {
      return res.status(200).end();
    });
  });
}
