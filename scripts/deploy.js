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

  // Verify contract on block explorer if API key is provided
  const verifyNetworks = ["base", "baseSepolia", "celo", "celoAlfajores"];
  if (verifyNetworks.includes(hre.network.name)) {
    console.log("\nWaiting for block confirmations...");
    await blockLedger.deploymentTransaction()?.wait(5);

    try {
      const explorerName = hre.network.name.includes("celo")
        ? "CeloScan"
        : "BaseScan";
      console.log(`Verifying contract on ${explorerName}...`);
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
