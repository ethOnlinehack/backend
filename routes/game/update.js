const Game = require("../../models/Game");

module.exports = async function (req, res) {
  console.log("Updating a game  with id ", req.params);
  
  const game = await Game.findOneAndUpdate({_id:req.params.gameId},req.body,{returnDocument:"after"});

  res.status(200).send(game);
};
