# Hardhat Simple Storage Contract

Follows the Blockchain FCC course on YT.

## Instructions

1. Create and configure a `.env` file:

```sh
GOERLI_RPC_URL=https://rpc-link-to-goerli-network
PRIVATE_KEY=privateKeyToWalletAccount
ETHERSCAN_API_KEY=apiKeyForEtherscan
REPORT_GAS=1 # or 0
COINMARKETCAP_API_KEY=apiKeyForCoinMarketCap
```

2. Deploy and run contract on default hardhat network:

```sh
npx hardhat run scripts/deploy.js
```

3. Optionally, deploy and run contract on a different network:

```sh
npx hardhat run scripts/deploy.js --network goerli
```
