import User from '../models/user';
import cuid from 'cuid';
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
  User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ user });
  });
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
