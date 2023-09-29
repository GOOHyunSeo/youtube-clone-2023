const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "YouTube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  next();
};

export default localsMiddleware;
