require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");

// Load environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Testnet RPC URLs
const RPC_URLS = {
  "sepolia_base": process.env.SEPOLIA_BASE_RPC,
  "bitlayer": process.env.BITLAYER_RPC,
  "bevm": process.env.BEVM_RPC,
};

// Create provider and wallet instances
const providers = {};
const wallets = {};
for (const network in RPC_URLS) {
  providers[network] = new ethers.JsonRpcProvider(RPC_URLS[network]);
  wallets[network] = new ethers.Wallet(PRIVATE_KEY, providers[network]);
}

// Transfer function
async function sendTransaction(from, to, amount = "0.0001") {
  try {
    console.log(`[INFO] Sending ${amount} ETH from ${from} to ${to}...`);
    const tx = await wallets[from].sendTransaction({
      to: wallets[to].address,
      value: ethers.parseEther(amount),
    });

    console.log(`[INFO] Transaction sent: ${tx.hash}`);  // Log the tx hash right after sending

    // Wait for the transaction to be mined and confirmed
    const receipt = await tx.wait();
    console.log(`[INFO] Receipt: ${JSON.stringify(receipt)}`); // Log the full receipt object

    if (receipt && receipt.transactionHash) {
      console.log(`[SUCCESS] Transaction confirmed: ${receipt.transactionHash}`);
      return receipt.transactionHash;
    } else {
      console.error(`[ERROR] Transaction receipt is missing transactionHash.`);
      return null;
    }
  } catch (error) {
    console.error(`[ERROR] Failed to send from ${from} to ${to}:`, error.message);
    return null;
  }
}

// Loop through all transfer combinations
async function runTransfers() {
  const networks = Object.keys(RPC_URLS);

  // Ensure all combinations are tested
  const transferPairs = [
    ["sepolia_base", "bitlayer"],
    ["sepolia_base", "bevm"],
    ["bitlayer", "sepolia_base"],
    ["bitlayer", "bevm"],
    ["bevm", "sepolia_base"],
    ["bevm", "bitlayer"],
  ];

  for (const [from, to] of transferPairs) {
    await sendTransaction(from, to);
  }
}

// Start the process
console.log("[INFO] Starting automated testnet transactions...");

// Run the transfers immediately
runTransfers()
  .then(() => console.log("[INFO] Initial transfers completed!"))
  .catch((err) => console.error("[ERROR] Unexpected issue during initial run:", err));

// Set interval to run the transfers every 24 hours (86,400,000 milliseconds)
setInterval(() => {
  console.log("[INFO] Running transfers again...");
  runTransfers()
    .then(() => console.log("[INFO] Transfers completed after 24 hours."))
    .catch((err) => console.error("[ERROR] Unexpected issue during scheduled run:", err));
}, 86400000);  // 86,400,000 ms = 24 hours

