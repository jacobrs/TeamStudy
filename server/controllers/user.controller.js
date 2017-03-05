import User from '../models/user';
import cuid from 'cuid';
import sha512 from 'sha512';
import sanitizeHtml from 'sanitize-html';

export function getUsers(req, res) {
  User.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ users });
  });
}

export function addUser(req, res) {
  // Check for empty fields
  if (!req.body.user.firstName || !req.body.user.lastName || !req.body.user.email || !req.body.user.password ||
    !req.body.user.studentId) {
    return res.status(403).end();
  }

  // Chek for invalid student ID format
  const studentIDRegEx = /^[0-9]*$/;
  if (!req.body.user.studentId.match(studentIDRegEx)) {
    return res.status(403).end();
  }

  // Check for invalid email format
  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!req.body.user.email.match(emailRegEx)) {
    return res.status(403).end();
  }

  const newUser = new User(req.body.user);

  // Let's sanitize inputs
  newUser.firstName = sanitizeHtml(newUser.firstName);
  newUser.lastName = sanitizeHtml(newUser.lastName);
  newUser.studentId = sanitizeHtml(newUser.studentId);
  newUser.email = sanitizeHtml(newUser.email);
  newUser.password = sha512(newUser.password).toString('hex');

  newUser.cuid = cuid();
  newUser.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ user: saved });
  });
}

export function getUser(req, res) {
  // just get the user information
  User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    user.password = undefined;
    return res.json({ user });
  });
}

export function authenticateUser(req, res) {
  res.status(200);
  return res.json({ user: req.user, statusCode: 200 });
}

export function updateUser(req, res) {
  firstName = sanitizeHtml(req.body.user.firstName);
  lastName = sanitizeHtml(req.body.user.lastName);
  studentId = sanitizeHtml(req.body.user.studentId);
  email = sanitizeHtml(req.body.user.email);
  password = sha512(req.body.user.password).toString('hex');

  let update = { firstName, lastName, studentId, email, password };

  User.findOneAndUpdate({ cuid: req.params.cuid }, { $set: update }, function (err, updated) {
    if (err) {
      return res.status(500).send(err);
    } 
    else {
      return res.json({ user: updated });
    }
  });
}

export function deleteUser(req, res) {
  User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    user.remove(() => {
      return res.status(200).end();
    });
  });
}

export function loginUser(req, res) {
  res.status(200);
  return res.json({ user: req.user, statusCode: 200 });
}

export function logoutUser(req, res) {
  req.session.destroy(function (err) {
    res.json({ user: null, statusCode: 200, message: 'User logged out successfully' });
  });
}

export function getUserStudyGroups(req, res) {
  User.findOne({ cuid: req.params.cuid }).select('studyGroups').exec((err, studyGroups) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ studyGroups });
  });
}

export function addUserStudyGroups(req, res) {
  let groups = sanitizeHtml(req.body.studyGroups);
  User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    user.studyGroups.push(groups);
    user.save((err, saved) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json({ user: saved });
    });
  });
}

export function deleteUserStudyGroups(req, res) {
  let groups = sanitizeHtml(req.body.studyGroups);
  User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    for (var i = user.studyGroups.length - 1; i >= 0; i--) {
      if (user.studyGroups[i] == groups) {
        user.studyGroups.splice(i, 1);
      }
    }
    user.save((err, saved) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json({ user: saved });
    });
  });
}

