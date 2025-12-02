const hre = require("hardhat");

async function main() {
  console.log("Deploying BlockLedger to", hre.network.name, "...");

  const BlockLedger = await hre.ethers.getContractFactory("BlockLedger");
  const blockLedger = await BlockLedger.deploy();

  await blockLedger.waitForDeployment();

  const address = await blockLedger.getAddress();
  console.log("BlockLedger deployed to:", address);
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", (await hre.ethers.provider.getNetwork()).chainId);

  // Verify contract on BaseScan if API key is provided
  if (hre.network.name === "base" || hre.network.name === "baseSepolia") {
    console.log("\nWaiting for block confirmations...");
    await blockLedger.deploymentTransaction()?.wait(5);

    try {
      console.log("Verifying contract on BaseScan...");
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("Contract verified successfully!");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
