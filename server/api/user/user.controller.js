const controller = {};

controller.me = function me(req, res) {
  return res.json(req.user);
};

module.exports = controller;
