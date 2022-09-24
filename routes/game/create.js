const Game = require("../../models/Game");
const uuid = require("uuid");
const ethers = require("ethers");
const fs = require("fs");
const utils = require("../utils");
const newGameItemsJson = require("../NewGameItems.json");

module.exports = async function (req, res) {
  console.log("Creating a game with body ", req.body);
  const body = req.body;
  const userId = req.user.id;
  //sami generates a smartcontract and retrieves it s address here
  const bytecode =
    "0x60806040523480156200001157600080fd5b506040516200330738038062003307833981810160405281019062000037919062000389565b604051806020016040528060008152506200005881620000bb60201b60201c565b50816003908051906020019062000071929190620000d7565b5080600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505062000454565b8060029080519060200190620000d3929190620000d7565b5050565b828054620000e5906200041e565b90600052602060002090601f01602090048101928262000109576000855562000155565b82601f106200012457805160ff191683800117855562000155565b8280016001018555821562000155579182015b828111156200015457825182559160200191906001019062000137565b5b50905062000164919062000168565b5090565b5b808211156200018357600081600090555060010162000169565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620001f082620001a5565b810181811067ffffffffffffffff82111715620002125762000211620001b6565b5b80604052505050565b60006200022762000187565b9050620002358282620001e5565b919050565b600067ffffffffffffffff821115620002585762000257620001b6565b5b6200026382620001a5565b9050602081019050919050565b60005b838110156200029057808201518184015260208101905062000273565b83811115620002a0576000848401525b50505050565b6000620002bd620002b7846200023a565b6200021b565b905082815260208101848484011115620002dc57620002db620001a0565b5b620002e984828562000270565b509392505050565b600082601f8301126200030957620003086200019b565b5b81516200031b848260208601620002a6565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620003518262000324565b9050919050565b620003638162000344565b81146200036f57600080fd5b50565b600081519050620003838162000358565b92915050565b60008060408385031215620003a357620003a262000191565b5b600083015167ffffffffffffffff811115620003c457620003c362000196565b5b620003d285828601620002f1565b9250506020620003e58582860162000372565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200043757607f821691505b602082108114156200044e576200044d620003ef565b5b50919050565b612ea380620004646000396000f3fe608060405234801561001057600080fd5b50600436106100f45760003560e01c8063731133e911610097578063a22cb46511610066578063a22cb46514610297578063a312889b146102b3578063e985e9c5146102e3578063f242432a14610313576100f4565b8063731133e914610223578063862440e21461023f578063893d20e81461025b5780638da5cb5b14610279576100f4565b80630e89341c116100d35780630e89341c146101775780631aa347dc146101a75780632eb2c2d6146101d75780634e1273f4146101f3576100f4565b8062fdd58e146100f957806301ffc9a71461012957806306fdde0314610159575b600080fd5b610113600480360381019061010e9190611afc565b61032f565b6040516101209190611b4b565b60405180910390f35b610143600480360381019061013e9190611bbe565b6103f8565b6040516101509190611c06565b60405180910390f35b6101616104da565b60405161016e9190611cba565b60405180910390f35b610191600480360381019061018c9190611cdc565b610568565b60405161019e9190611cba565b60405180910390f35b6101c160048036038101906101bc9190611cdc565b6105fc565b6040516101ce9190611cba565b60405180910390f35b6101f160048036038101906101ec9190611f06565b6106a1565b005b61020d60048036038101906102089190612098565b610742565b60405161021a91906121ce565b60405180910390f35b61023d600480360381019061023891906121f0565b61085b565b005b61025960048036038101906102549190612314565b6108ce565b005b61026361095b565b604051610270919061237f565b60405180910390f35b610281610985565b60405161028e919061237f565b60405180910390f35b6102b160048036038101906102ac91906123c6565b6109ab565b005b6102cd60048036038101906102c89190611cdc565b6109c1565b6040516102da9190611cba565b60405180910390f35b6102fd60048036038101906102f89190612406565b610a61565b60405161030a9190611c06565b60405180910390f35b61032d60048036038101906103289190612446565b610ab3565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156103a0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103979061254f565b60405180910390fd5b60008083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806104c357507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806104d357506104d282610b54565b5b9050919050565b600380546104e79061259e565b80601f01602080910402602001604051908101604052809291908181526020018280546105139061259e565b80156105605780601f1061053557610100808354040283529160200191610560565b820191906000526020600020905b81548152906001019060200180831161054357829003601f168201915b505050505081565b6060600280546105779061259e565b80601f01602080910402602001604051908101604052809291908181526020018280546105a39061259e565b80156105f05780601f106105c5576101008083540402835291602001916105f0565b820191906000526020600020905b8154815290600101906020018083116105d357829003601f168201915b50505050509050919050565b606060056000838152602001908152602001600020805461061c9061259e565b80601f01602080910402602001604051908101604052809291908181526020018280546106489061259e565b80156106955780601f1061066a57610100808354040283529160200191610695565b820191906000526020600020905b81548152906001019060200180831161067857829003601f168201915b50505050509050919050565b6106a9610bbe565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614806106ef57506106ee856106e9610bbe565b610a61565b5b61072e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161072590612642565b60405180910390fd5b61073b8585858585610bc6565b5050505050565b60608151835114610788576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161077f906126d4565b60405180910390fd5b6000835167ffffffffffffffff8111156107a5576107a4611d0e565b5b6040519080825280602002602001820160405280156107d35781602001602082028036833780820191505090505b50905060005b8451811015610850576108208582815181106107f8576107f76126f4565b5b6020026020010151858381518110610813576108126126f4565b5b602002602001015161032f565b828281518110610833576108326126f4565b5b6020026020010181815250508061084990612752565b90506107d9565b508091505092915050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1661089c610bbe565b73ffffffffffffffffffffffffffffffffffffffff16146108bc57600080fd5b6108c884848484610ee8565b50505050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1661090f610bbe565b73ffffffffffffffffffffffffffffffffffffffff161461092f57600080fd5b806005600084815260200190815260200160002090805190602001906109569291906119b1565b505050565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6109bd6109b6610bbe565b8383611099565b5050565b600560205280600052604060002060009150905080546109e09061259e565b80601f0160208091040260200160405190810160405280929190818152602001828054610a0c9061259e565b8015610a595780601f10610a2e57610100808354040283529160200191610a59565b820191906000526020600020905b815481529060010190602001808311610a3c57829003601f168201915b505050505081565b60008273ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610aa05760019050610aad565b610aaa8383611206565b90505b92915050565b610abb610bbe565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161480610b015750610b0085610afb610bbe565b610a61565b5b610b40576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b3790612642565b60405180910390fd5b610b4d858585858561129a565b5050505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b8151835114610c0a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c019061280d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610c7a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c719061289f565b60405180910390fd5b6000610c84610bbe565b9050610c94818787878787611536565b60005b8451811015610e45576000858281518110610cb557610cb46126f4565b5b602002602001015190506000858381518110610cd457610cd36126f4565b5b60200260200101519050600080600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610d75576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d6c90612931565b60405180910390fd5b81810360008085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610e2a9190612951565b9250508190555050505080610e3e90612752565b9050610c97565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610ebc9291906129a7565b60405180910390a4610ed281878787878761153e565b610ee0818787878787611546565b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610f58576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f4f90612a50565b60405180910390fd5b6000610f62610bbe565b90506000610f6f8561172d565b90506000610f7c8561172d565b9050610f8d83600089858589611536565b8460008088815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610fec9190612951565b925050819055508673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62898960405161106a929190612a70565b60405180910390a46110818360008985858961153e565b611090836000898989896117a7565b50505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611108576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110ff90612b0b565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516111f99190611c06565b60405180910390a3505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141561130a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113019061289f565b60405180910390fd5b6000611314610bbe565b905060006113218561172d565b9050600061132e8561172d565b905061133e838989858589611536565b600080600088815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050858110156113d5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113cc90612931565b60405180910390fd5b85810360008089815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508560008089815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461148a9190612951565b925050819055508773ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628a8a604051611507929190612a70565b60405180910390a461151d848a8a86868a61153e565b61152b848a8a8a8a8a6117a7565b505050505050505050565b505050505050565b505050505050565b6115658473ffffffffffffffffffffffffffffffffffffffff1661198e565b15611725578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b81526004016115ab959493929190612b80565b602060405180830381600087803b1580156115c557600080fd5b505af19250505080156115f657506040513d601f19601f820116820180604052508101906115f39190612bfd565b60015b61169c57611602612c37565b806308c379a0141561165f5750611617612c59565b806116225750611661565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116569190611cba565b60405180910390fd5b505b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161169390612d61565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611723576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161171a90612df3565b60405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff81111561174c5761174b611d0e565b5b60405190808252806020026020018201604052801561177a5781602001602082028036833780820191505090505b5090508281600081518110611792576117916126f4565b5b60200260200101818152505080915050919050565b6117c68473ffffffffffffffffffffffffffffffffffffffff1661198e565b15611986578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b815260040161180c959493929190612e13565b602060405180830381600087803b15801561182657600080fd5b505af192505050801561185757506040513d601f19601f820116820180604052508101906118549190612bfd565b60015b6118fd57611863612c37565b806308c379a014156118c05750611878612c59565b8061188357506118c2565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118b79190611cba565b60405180910390fd5b505b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118f490612d61565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611984576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161197b90612df3565b60405180910390fd5b505b505050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b8280546119bd9061259e565b90600052602060002090601f0160209004810192826119df5760008555611a26565b82601f106119f857805160ff1916838001178555611a26565b82800160010185558215611a26579182015b82811115611a25578251825591602001919060010190611a0a565b5b509050611a339190611a37565b5090565b5b80821115611a50576000816000905550600101611a38565b5090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611a9382611a68565b9050919050565b611aa381611a88565b8114611aae57600080fd5b50565b600081359050611ac081611a9a565b92915050565b6000819050919050565b611ad981611ac6565b8114611ae457600080fd5b50565b600081359050611af681611ad0565b92915050565b60008060408385031215611b1357611b12611a5e565b5b6000611b2185828601611ab1565b9250506020611b3285828601611ae7565b9150509250929050565b611b4581611ac6565b82525050565b6000602082019050611b606000830184611b3c565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611b9b81611b66565b8114611ba657600080fd5b50565b600081359050611bb881611b92565b92915050565b600060208284031215611bd457611bd3611a5e565b5b6000611be284828501611ba9565b91505092915050565b60008115159050919050565b611c0081611beb565b82525050565b6000602082019050611c1b6000830184611bf7565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611c5b578082015181840152602081019050611c40565b83811115611c6a576000848401525b50505050565b6000601f19601f8301169050919050565b6000611c8c82611c21565b611c968185611c2c565b9350611ca6818560208601611c3d565b611caf81611c70565b840191505092915050565b60006020820190508181036000830152611cd48184611c81565b905092915050565b600060208284031215611cf257611cf1611a5e565b5b6000611d0084828501611ae7565b91505092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611d4682611c70565b810181811067ffffffffffffffff82111715611d6557611d64611d0e565b5b80604052505050565b6000611d78611a54565b9050611d848282611d3d565b919050565b600067ffffffffffffffff821115611da457611da3611d0e565b5b602082029050602081019050919050565b600080fd5b6000611dcd611dc884611d89565b611d6e565b90508083825260208201905060208402830185811115611df057611def611db5565b5b835b81811015611e195780611e058882611ae7565b845260208401935050602081019050611df2565b5050509392505050565b600082601f830112611e3857611e37611d09565b5b8135611e48848260208601611dba565b91505092915050565b600080fd5b600067ffffffffffffffff821115611e7157611e70611d0e565b5b611e7a82611c70565b9050602081019050919050565b82818337600083830152505050565b6000611ea9611ea484611e56565b611d6e565b905082815260208101848484011115611ec557611ec4611e51565b5b611ed0848285611e87565b509392505050565b600082601f830112611eed57611eec611d09565b5b8135611efd848260208601611e96565b91505092915050565b600080600080600060a08688031215611f2257611f21611a5e565b5b6000611f3088828901611ab1565b9550506020611f4188828901611ab1565b945050604086013567ffffffffffffffff811115611f6257611f61611a63565b5b611f6e88828901611e23565b935050606086013567ffffffffffffffff811115611f8f57611f8e611a63565b5b611f9b88828901611e23565b925050608086013567ffffffffffffffff811115611fbc57611fbb611a63565b5b611fc888828901611ed8565b9150509295509295909350565b600067ffffffffffffffff821115611ff057611fef611d0e565b5b602082029050602081019050919050565b600061201461200f84611fd5565b611d6e565b9050808382526020820190506020840283018581111561203757612036611db5565b5b835b81811015612060578061204c8882611ab1565b845260208401935050602081019050612039565b5050509392505050565b600082601f83011261207f5761207e611d09565b5b813561208f848260208601612001565b91505092915050565b600080604083850312156120af576120ae611a5e565b5b600083013567ffffffffffffffff8111156120cd576120cc611a63565b5b6120d98582860161206a565b925050602083013567ffffffffffffffff8111156120fa576120f9611a63565b5b61210685828601611e23565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61214581611ac6565b82525050565b6000612157838361213c565b60208301905092915050565b6000602082019050919050565b600061217b82612110565b612185818561211b565b93506121908361212c565b8060005b838110156121c15781516121a8888261214b565b97506121b383612163565b925050600181019050612194565b5085935050505092915050565b600060208201905081810360008301526121e88184612170565b905092915050565b6000806000806080858703121561220a57612209611a5e565b5b600061221887828801611ab1565b945050602061222987828801611ae7565b935050604061223a87828801611ae7565b925050606085013567ffffffffffffffff81111561225b5761225a611a63565b5b61226787828801611ed8565b91505092959194509250565b600067ffffffffffffffff82111561228e5761228d611d0e565b5b61229782611c70565b9050602081019050919050565b60006122b76122b284612273565b611d6e565b9050828152602081018484840111156122d3576122d2611e51565b5b6122de848285611e87565b509392505050565b600082601f8301126122fb576122fa611d09565b5b813561230b8482602086016122a4565b91505092915050565b6000806040838503121561232b5761232a611a5e565b5b600061233985828601611ae7565b925050602083013567ffffffffffffffff81111561235a57612359611a63565b5b612366858286016122e6565b9150509250929050565b61237981611a88565b82525050565b60006020820190506123946000830184612370565b92915050565b6123a381611beb565b81146123ae57600080fd5b50565b6000813590506123c08161239a565b92915050565b600080604083850312156123dd576123dc611a5e565b5b60006123eb85828601611ab1565b92505060206123fc858286016123b1565b9150509250929050565b6000806040838503121561241d5761241c611a5e565b5b600061242b85828601611ab1565b925050602061243c85828601611ab1565b9150509250929050565b600080600080600060a0868803121561246257612461611a5e565b5b600061247088828901611ab1565b955050602061248188828901611ab1565b945050604061249288828901611ae7565b93505060606124a388828901611ae7565b925050608086013567ffffffffffffffff8111156124c4576124c3611a63565b5b6124d088828901611ed8565b9150509295509295909350565b7f455243313135353a2061646472657373207a65726f206973206e6f742061207660008201527f616c6964206f776e657200000000000000000000000000000000000000000000602082015250565b6000612539602a83611c2c565b9150612544826124dd565b604082019050919050565b600060208201905081810360008301526125688161252c565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806125b657607f821691505b602082108114156125ca576125c961256f565b5b50919050565b7f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60008201527f6572206e6f7220617070726f7665640000000000000000000000000000000000602082015250565b600061262c602f83611c2c565b9150612637826125d0565b604082019050919050565b6000602082019050818103600083015261265b8161261f565b9050919050565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b60006126be602983611c2c565b91506126c982612662565b604082019050919050565b600060208201905081810360008301526126ed816126b1565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061275d82611ac6565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156127905761278f612723565b5b600182019050919050565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b60006127f7602883611c2c565b91506128028261279b565b604082019050919050565b60006020820190508181036000830152612826816127ea565b9050919050565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000612889602583611c2c565b91506128948261282d565b604082019050919050565b600060208201905081810360008301526128b88161287c565b9050919050565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b600061291b602a83611c2c565b9150612926826128bf565b604082019050919050565b6000602082019050818103600083015261294a8161290e565b9050919050565b600061295c82611ac6565b915061296783611ac6565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561299c5761299b612723565b5b828201905092915050565b600060408201905081810360008301526129c18185612170565b905081810360208301526129d58184612170565b90509392505050565b7f455243313135353a206d696e7420746f20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b6000612a3a602183611c2c565b9150612a45826129de565b604082019050919050565b60006020820190508181036000830152612a6981612a2d565b9050919050565b6000604082019050612a856000830185611b3c565b612a926020830184611b3c565b9392505050565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b6000612af5602983611c2c565b9150612b0082612a99565b604082019050919050565b60006020820190508181036000830152612b2481612ae8565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000612b5282612b2b565b612b5c8185612b36565b9350612b6c818560208601611c3d565b612b7581611c70565b840191505092915050565b600060a082019050612b956000830188612370565b612ba26020830187612370565b8181036040830152612bb48186612170565b90508181036060830152612bc88185612170565b90508181036080830152612bdc8184612b47565b90509695505050505050565b600081519050612bf781611b92565b92915050565b600060208284031215612c1357612c12611a5e565b5b6000612c2184828501612be8565b91505092915050565b60008160e01c9050919050565b600060033d1115612c565760046000803e612c53600051612c2a565b90505b90565b600060443d1015612c6957612cec565b612c71611a54565b60043d036004823e80513d602482011167ffffffffffffffff82111715612c99575050612cec565b808201805167ffffffffffffffff811115612cb75750505050612cec565b80602083010160043d038501811115612cd4575050505050612cec565b612ce382602001850186611d3d565b82955050505050505b90565b7f455243313135353a207472616e7366657220746f206e6f6e204552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b6000612d4b603483611c2c565b9150612d5682612cef565b604082019050919050565b60006020820190508181036000830152612d7a81612d3e565b9050919050565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b6000612ddd602883611c2c565b9150612de882612d81565b604082019050919050565b60006020820190508181036000830152612e0c81612dd0565b9050919050565b600060a082019050612e286000830188612370565b612e356020830187612370565b612e426040830186611b3c565b612e4f6060830185611b3c565b8181036080830152612e618184612b47565b9050969550505050505056fea26469706673582212209a5d0a266a5238cc51d1e7dbdd679a861033208049b4b784efc45b4a1618e8ed64736f6c63430008090033";
  const deploy = async (name = "gameName", address = "0xabcFa978E8D0b9294D29E1215c0Cd11BEC8023A1") => {
    const provider = utils.provider;
    const metadata = newGameItemsJson;

    // Deploy the contract
    const factory = new ethers.ContractFactory(metadata.abi, bytecode, utils.wallet);
    const contract = await factory.deploy(name, address);
    await contract.deployed();
    return contract.address;
  };

  const smartcontractAddress = await deploy();
  const accessToken = uuid.v4();
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
    console.log(err);
    res.status(500).send("Error creating new game please try again." + err);
  }
};
