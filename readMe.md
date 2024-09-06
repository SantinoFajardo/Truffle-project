<h1>Simple contract environment project using Truffle</h1>
<h2>Create contract</h2>

Inside the `/contract` folder are the ERC-721 contract that we will use on this project. Is a simple contract that mint some NFTs and list them.

<h2>Create migrations</h2>

Inside the `/migrations` folder are the scripts to deploy the contract.
Once the contract are deployed on any network(ganache, sepolia, truffle) will be listed on the `/build/MyToken` file inside the `networks` list with all the contract details

<h2>Deploy the contracts</h2>

We can deploy the contracts on different networks using the same code.

<h3>Deploying on truffle local blockchain</h3>

1. We can use some test accounts provided by truffle to deploy the contract running

```shell
    truffle develop
```

2. Run the next command to run the migration script (deploy the contract) inside the running terminal

```shell
    migrate
```

<h3>Deploying on Ganache local blockchain</h3>

1. Add the `ganache` network inside the `truffle.config.js` file

```json
    ganache: {
      host:"127.0.0.1",
      port: 8545,
      network_id: "*"
    },
```

2. Run `ganache` to run the ganache blockchain in local

3. Run the next command to deploy the contract on the ganache network on a separate terminal:

```shell
    truffle migrate --network ganache
```

3. Open the ganache console to interact with the contract:

```shell
    truffle console --network ganache
```

You con interact with the contract running some function with something like:

```js
const spacebearInstance = await Spacebear.deployed();
await spacebearInstance.buyToken({ value: web3.utils.toWei("0.1", "ether") });
```

<h3>Deploying on Sepolia blockchain using mnemonic and Infura</h3>

1. First we need add the `Sepolia` chain inside the `truffle.config.json` file.

```json
    sepolia: {
      provider: () => new HDWalletProvider(mnemonicPhrase,
       `https://sepolia.infura.io/v3/${infuraProjectId}`
      ),
      network_id: 11155111, // Sepolia's network ID
      skipDryRun: true // Skip the dry run option
     }
```

2. Open the sepolia console to communicate with it:

```shell
    truffle console --network sepolia
```

3. Run `migrate` inside the sepolia console to deploy the contract on sepolia

<h2>Testing contract</h2>

Inside the `/test` fodler are listed all the contracts tests.

<h3>Using Truffle</h3>

If we want to use `truffle` to test the contracts, the contract will be automatically deployed when run the test to interact with. Just we need run:

```shell
    truffle test
```

<h3>Using Ganache</h3>

We need run the `ganache` blockchain in local running

```shell
    ganache
```

And then, in another terminal, run:

```shell
    truffle console --network ganache
```

And inside the console just run `test`.

<h2>Debugging contracts</h2>

<h3>Debugging on deployment</h3>

Install the next package to add some logs to the contract

```shell
    npm install @ganache/console.log
```

add the import

```solidity
    import "@ganache/console.log/console.sol";
```

and use it

```solidity
    console.log("got here", tokenId, msg.value);
```

And that's it, now you can deploy again the contract and interact with it.

<h3>Debugging deployed contracts</h3>

Let's say, you have a deployed contract and some users report bugs when try run some functions.

1. Run the ganache forking the chain where we want to debugg the contracts

```shell
    ganache --fork --chain.chainId <chainId>
```

2. Use truffle to connect to Ganache

```shell
    truffle debug <TXHASH> --network ganache
```

The Truffer debugger will load, download the source doe from etherscan, compile the code and run the code
