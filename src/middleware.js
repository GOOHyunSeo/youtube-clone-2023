const localsMiddleware = (req, res, next) => {
  console.log(req.session.id);
  res.locals.siteName = "YouTube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  console.log(res.locals);
  next();
};

export default localsMiddleware;
