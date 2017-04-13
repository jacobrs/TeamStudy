function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
	                                                                                                                                                                                                        } else {
    res.json({ user: null, statusCode: 403, message: 'User not authenticated.' });
	                                                                                                                                                                                                        }
}

export default ensureAuthenticated;
