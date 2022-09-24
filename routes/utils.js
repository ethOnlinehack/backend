import { Web3Storage } from "web3.storage";
import { File } from "web3.storage";
const ethers = require("ethers");
const newGameItemsJson = require("./NewGameItems.json");

function getAccessToken() {
  return process.env.WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

function makeFileObjects(object, filename) {
  const buffer = Buffer.from(JSON.stringify(object));

  const files = [new File([buffer], filename)];
  return files;
}

async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  return cid;
}
const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.infura.io/v3/16e68b2896934870bb1f6c768bfba400"
);
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract("0x03ECddB0990Ec678642E6D0C1fdbBA990dFEc374", newGameItemsJson.abi, wallet);
const mintToAddress = async (to, id, amount, contractAddress) => {
  const Contract = contract.attach(contractAddress);
  const response = await Contract.mint(to, id, amount, "");
  return response;
};
const transfer = async (from, to, id, amount, contractAddress) => {
  const Contract = contract.attach(contractAddress);
  const response = await Contract.safeTransferFrom(from, to, id, amount, "");
  return response;
};
module.exports = {
  storeFiles,
  makeFileObjects,
  makeStorageClient,
  provider,
  wallet,
  contract,
  transfer,
  mintToAddress,
};
