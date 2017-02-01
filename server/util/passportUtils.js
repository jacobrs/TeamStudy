function ensureAuthenticated(req, res, next) {
  console.log(req.session.passport);
  if (req.isAuthenticated())
    return next();
  else
    res.redirect('/');
}

export default ensureAuthenticated;
