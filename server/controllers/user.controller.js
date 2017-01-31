import User from '../models/user';
import cuid from 'cuid';
import sha512 from 'sha512';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
export function getUsers(req, res) {
  User.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ users });
  });
}

/**
 * Create new user
 * @param req
 * @param res
 * @returns void
 */
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

/**
 * Get user
 * @param req
 * @param res
 * @returns void
 */
export function getUser(req, res) {
  if(req.params.password == undefined || req.params.password == ""){
    // just get the user information
    User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json({ user });
    });
  }else{
    // log the user in

  }
}

/**
 * Delete user
 * @param req
 * @param res
 * @returns void
 */
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
