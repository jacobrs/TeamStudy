import User from '../models/user';
import cuid from 'cuid';
import sha512 from 'sha512';
import sanitizeHtml from 'sanitize-html';

export function getUsers(req, res) {
  console.log((req.user == undefined)?"No user":req.user.email);
  User.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ users });
  });
}

export function addUser(req, res) {
  if (!req.body.user.firstName || !req.body.user.lastName || !req.body.user.email || !req.body.user.password ||
    !req.body.user.studentId) {
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
    return res.json({ user });
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

export function loginUser(req, res){
  res.status(200);
  return res.json({user: req.user, statusCode: 200});
}
