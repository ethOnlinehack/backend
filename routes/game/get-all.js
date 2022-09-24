const Game = require("../../models/Game");

module.exports = async function (req, res) {
  console.log("Retrieving all Game for user", req.user);

  const games = await Game.find({ creator: req.user.id }).exec();

  res.status(200).send(games);
};
