const Game = require("../../models/Game");

module.exports = async function (req, res) {
  console.log("Retrieving a Game with id ", req.params.gameId);
  // security : verify that the user is actually the owner of the game 
  const game = await Game.findById(req.params.gameId);

  res.status(200).send(game);
};
