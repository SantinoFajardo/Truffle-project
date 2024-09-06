const SpaceBear = artifacts.require("MyToken");

// Using truffle network:
// 1) Run truffle develop to get some test accounts and start a blockchain in local host
// 2) Run 'migrate' inside the running terminal to deploy te contracts

// Using ganache network: (run `ganache` first)
// 1) Run `truffle migrate --network ganache`
// 2) To interact with the contract on a console, running the ganache blockchain, 
// run the command `truffle console --network ganache`. 
// Try run `const contractInstance = await Spacebear.deployed()` to interact with the contract trough the contractInstace variable.


module.exports = function (deployer,network,accounts) {
    deployer.deploy(SpaceBear, deployer.options.from);
}
