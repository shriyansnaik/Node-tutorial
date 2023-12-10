const authorization = (req, res, next) => {
  if (req.token_owner_id != req.params.id)
    return res
      .status(403)
      .send("You do not have permission to perform this action.");
  next();
};

module.exports = { authorization };
