const Nft = require("../../models/Nft");
const utils = require("../utils");
const Game = require("../../models/Game");

module.exports = async function (req, res) {
  console.log("Creating Nft with body ", req.body);
  const body = req.body;
  // sami uploads ipfs

  const upload = async (
    name,
    description,
    imageURL,
    cardURL,
    tokenId,
    attributes
  ) => {
    const filename = `${tokenId}.json`;
    const metadata = {
      name: name,
      description: description,
      image: imageURL,
      card: cardURL,
      attributes: attributes,
    };
    const cid  = await utils.storeFiles(utils.makeFileObjects(metadata, filename));
    return `https://${cid}.ipfs.w3s.link/${filename}`

  };


  const nfts = await Nft.find({ gameId: body.game_id });
  const game = await Game.findById(body.game_id);
  console.log("nfts " +nfts)
  console.log("nfts " +game)

  const nftsCount = nfts.length;
  const metadataUri = await upload(
    body.nft_name,
    body.nft_description,
    body.ipfs_uri,
    body.ipfs_card_uri,
    nfts.length,
    body.attributes
  );
  try {
    utils.setUri(
      nftsCount,
      metadataUri,
      game.smartcontract_address
    );
  } catch (err) {
    console.log("error while setting smartcontract  nft uri "* err)
  }
  try {
    const newNft = await Nft.create({
      name: body.nft_name,
      description: body.nft_description,
      ipfs_uri: body.ipfs_uri,
      ipfs_card_uri: body.ipfs_card_uri,
      ipfs_metadata: metadataUri,
      game_id: body.game_id,
      attributes: body.attributes,
      token_id: nfts.length,
    });

    console.log("Game Nft  ", newNft);

    res.status(200).send(newNft);
  } catch (err) {
    res.status(500).send("Error creating new game please try again." + err);
  }
};
