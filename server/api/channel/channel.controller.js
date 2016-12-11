const { handleEntityNotFound, handleError, respondWithResult } = require('../../util');
const { Channel, Message, User } = require('../../db');

const controller = {};

controller.index = function index(req, res) {
  const { team } = req;
  return team.getChannels()
    .then(respondWithResult(res))
    .catch(handleError(res));
};

controller.get = function index(req, res) {
  const channelId = req.params.channelId;
  return Channel
    .findOne({
      where: { channelId },
      include: [{
        model: Message,
        include: [{
          model: User,
        }],
      }],
      order: [
        [Message, 'ts'],
      ],
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

module.exports = controller;
