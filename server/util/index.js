module.exports.handleError = function handleError(res, statusCode) {
  const code = statusCode || 500;
  return (err) => {
    console.error(err);
    res.status(code).send(err);
    return null;
  };
};

module.exports.handleEntityNotFound = function handleEntityNotFound(res) {
  return (entity) => {
    if (!entity) {
      res.sendStatus(404);
      return null;
    }
    return entity;
  };
};

module.exports.decorateRequest = function decorateRequest(req, name, next) {
  if (!name) {
    throw Error('decorateRequest requires name argument');
  }
  return (entity) => {
    if (entity) {
      req[name] = entity;
      next();
    }
    return null;
  };
};

module.exports.respondWithResult = function respondWithResult(res, statusCode) {
  const code = statusCode || 200;
  return (entity) => {
    if (entity) {
      return res.status(code).json(entity);
    }
    return null;
  };
};
