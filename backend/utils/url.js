module.exports = function lowerasePaths() {
  return (req, res, next) => {
    if (req.path.toLowerCase() !== req.path) {
      res.redirect(301,req.path.toLowerCase());
    } else {
      next();
    }
  };
};
