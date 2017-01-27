import user from '../models/user';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
export function getUsers(req, res) {
  user.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ users });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addUser(req, res) {
  if (!req.body.user.firstName || !req.body.user.lastName || !req.body.user.email || !req.body.user.password ||
    !req.body.user.studentId) {
    res.status(403).end();
  }

  const newUser = new User(req.body.post);

  // Let's sanitize inputs
  newUser.firstName = sanitizeHtml(newUser.title);
  newUser.lastName = sanitizeHtml(newUser.name);
  newUser.studentId = sanitizeHtml(newUser.studentId);
  newUser.email = sanitizeHtml(newUser.email);

  newUser.cuid = cuid();
  newUser.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getUser(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ user });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deleteUser(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    user.remove(() => {
      res.status(200).end();
    });
  });
}
