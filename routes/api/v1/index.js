const router = require("express").Router();
const gamerSignIn = require("./gamer-sign-in");
const gamerVerifyNft = require("./verify-nft");
const getAllNfts = require("./get-all-nfts");
const getAllNftsByGamer = require("./get-all-nfts-by-gamer");
const mint = require("./mint");
const transfer = require("./transfer-nft");

router.post("/v1/gamer-sign-in", gamerSignIn);
router.post("/v1/mint/:walletAddress/:tokenId", mint);
router.post("/v1/transfer-nft/:walletAddress/:to/:tokenId", transfer);
router.get("/v1/verify/:walletAddress/:nftId", gamerVerifyNft);
router.get("/v1/get-all-nfts", getAllNfts);
router.get("/v1/get-all-nfts/:walletAddress", getAllNftsByGamer);

module.exports = router;
