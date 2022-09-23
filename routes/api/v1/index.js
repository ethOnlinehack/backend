const router = require('express').Router();
const gamerSignIn = require("./gamer-sign-in");
const gamerVerifyNft = require("./verify-nft");
const getAllNfts = require("./get-all-nfts");
const getAllNftsByGamer = require("./get-all-nfts-by-gamer");


router.post('/v1/gamer-sign-in', gamerSignIn);
router.get('/v1/verify/:walletAddress/:nftId', gamerVerifyNft);
router.get('/v1/get-all-nfts', getAllNfts);
router.get('/v1/get-all-nfts/:walletAddress', getAllNftsByGamer);


module.exports = router;
