import { ethers, run, network } from "hardhat";
import "dotenv/config";

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract to: ${simpleStorage.address}`);

  // Verify contract if using public network (e.g. Goerli)
  // Goerli's chainId is 5
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    // Etherscan's may take a moment to discover transaction after deployment
    // Therefore, wait a few blocks to be mined before verifying
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  // Get current value of contract
  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value is: ${currentValue}`);

  // Update and re-retrieve new value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value is: ${updatedValue}`);
}

async function verify(contractAddress: string, args: any[]) {
  // only run this if contract is deployed on a public network

  // RESOURCES
  // https://github.com/NomicFoundation/hardhat/blob/main/packages/hardhat-etherscan/src/constants.ts
  // https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan#using-programmatically
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (err: any) {
    if (err.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    } else {
      console.error(err);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
