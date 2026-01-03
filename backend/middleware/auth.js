// Middleware to check if admin is authenticated
const requireAuth = (req, res, next) => {
  if (req.session && req.session.adminId) {
    return next();
  } else {
    return res.redirect('/admin/login');
  }
};

module.exports = { requireAuth };

