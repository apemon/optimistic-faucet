const ethers = require('ethers');
const faucet_abi = require('./Faucet.json');
const erc20_abi = require('./IERC20.json');
const {RPC_URL, PRIVATE_KEY, ETH_ADDR, FAUCET_ADDR, PORT} = process.env;
const provider = new ethers.providers.JsonRpcProvider(RPC_URL || 'https://kovan.optimism.io');
const signer = new ethers.Wallet(PRIVATE_KEY).connect(provider);
const eth = new ethers.Contract(ETH_ADDR, erc20_abi.abi).connect(signer);
const faucet = new ethers.Contract(FAUCET_ADDR, faucet_abi.abi).connect(signer);

const express = require('express');
const app = express();

app.get('/ping', (_, res) => {
    res.send(`Ok`);
});

app.get('/request/:addr', async (req, res) => {
    const addr = req.params.addr;
    if(!ethers.utils.isAddress(addr)) {
        res.status(400);
        return res.send(`incorrect address format`);
    }
    try {
        await faucet.send(addr)
        res.status(204);
        return res.send(``)
    } catch (err) {
        console.log(err)
        res.status(400);
        return res.send(`limit rate hit, try again next 24 hr`);
    }
});

const port = PORT || 8080;
app.listen(port, () => {
    console.log(`helloworld: listening on port ${port}`);
});
