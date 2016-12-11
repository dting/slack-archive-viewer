const { handleError } = require('../../util');
const { SAVUser } = require('../../db');

const auth = {};

auth.populateReqUser = function populateReqUser(req, res, next) {
  const userId = req.user._id;
  return SAVUser
    .find({
      where: { _id: userId },
      attributes: ['_id', 'name', 'slack'],
    })
    .then((user) => {
      if (!user) return res.status(401).end();
      req.user = user;
      next();
      return null;
    })
    .catch(handleError(res));
};

module.exports = auth;
