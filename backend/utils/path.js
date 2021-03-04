const getMainPath = (req) => {
  return req.protocol + "://" + req.get("host");
};

module.exports = {
  getMainPath,
}; 