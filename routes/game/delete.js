const Game = require("../../models/Game");

module.exports = async function (req, res) {
  console.log("deleting a Game with id ", req.params.gameId);
  
  const game = await Game.deleteOne({_id:req.params.gameId});

  res.status(200).send(game);
};
