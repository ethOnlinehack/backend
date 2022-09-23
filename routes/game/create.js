const Game = require("../../models/Game");
const uuid = require('uuid');

module.exports = async function (req, res) {
  console.log("Creating a game with body ", req.body);
  const body = req.body;
  const userId = req.user.id;
  //sami generates a smartcontract and retrieves it s address here
  
  const smartcontractAddress = "0x...";
  
  const accessToken =  uuid.v4();
  try {
    const newGame = await Game.create({
      name: body.game_name,
      description: body.game_description,
      creator: userId,
      smartcontract_address: smartcontractAddress,
      access_token: accessToken,
    });
    console.log("Game created  ", newGame);

    res.status(200).json(newGame);
  } catch (err) {
    console.log(err)
    res.status(500).send("Error creating new game please try again." + err);
  }
};
