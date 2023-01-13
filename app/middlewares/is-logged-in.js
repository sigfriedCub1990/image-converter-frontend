const redirectIfLoggedIn = (redirectPath) => (req, res, next) => {
  if (req.session && req.session.userId) {
    res.redirect(redirectPath);
  } else {
    next();
  }
};

module.exports = redirectIfLoggedIn;
