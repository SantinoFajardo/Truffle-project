const SpaceBear = artifacts.require("MyToken");
const truffleAssertion = require("truffle-assertions")

// There is two ways to run tests
/*
1) With truffle network we can just run truffle test
2) With ganache network we can run the ganache blockchain running ganache in local with `ganache` 
and then run `truffle console --network ganache` to open the ganache console. And run `test`
 */

contract("Spacebear", (accounts) => {
    it("should credit an NFT to a specific account" ,async() => {
        const spaceBearInstance = await SpaceBear.deployed();
        const txResult = await spaceBearInstance.safeMint(accounts[1], "spacebear_1.json");
        const nftOwner = await spaceBearInstance.ownerOf(0)
        
        // Test the event emmited when the nft is minted
        truffleAssertion.eventEmitted(txResult,
            "Transfer", 
            {
                from:"0x0000000000000000000000000000000000000000",
                to:accounts[1],
                tokenId: web3.utils.toBN("0") // Because incompabilities between javascript and solidity numbers, js libraries to interact with contract/nodes use bignumbers
            }
        )
        assert.equal(nftOwner,accounts[1],`Owner of token 0 is not ${accounts[1]} is ${nftOwner}`)
    })
})