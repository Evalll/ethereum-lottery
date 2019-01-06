
const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = new HDWalletProvider (
  'traffic review silver relief eye camera panel forget session birth crack shop',
  'https://rinkeby.etherscan.io/address/0xc092cb451eeb25cbd881505fd72547ec6b7840fd'
);

const Web3 = require('web3');
const web3 = new Web3(provider);

const { interface, bytecode } = require('./compile');

const deploy = async() => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' })

  console.log(interface);
  console.log('Contract deployed to', result.options.address);
}

deploy();