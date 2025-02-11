# Testnet Wallet Auto-Transfer Bot

## Overview
This bot automates ETH transactions across multiple testnet networks. It will cycle through predefined networks and send **0.0001 ETH** per transaction while logging all events.

### Supported Testnets:
- **Sepolia Base**
- **Bitlayer**
- **BEVM**

## Features
✅ Fully automated transfers (no manual commands needed)  
✅ Sends **0.0001 ETH** per transaction  
✅ Logs success/failure for each transfer  
✅ Runs locally on your VPS (no external API calls required)  

---

## Installation Guide

### 1️⃣ Install Node.js & Required Dependencies
Ensure your VPS has Node.js installed. If not, install it with:
```sh
sudo apt update && sudo apt install nodejs npm -y
```

Then, install the required Node.js packages:
```sh
npm install ethers dotenv fs
```

---

### 2️⃣ Setup Environment Variables
Create a `.env` file in the same directory as the bot and add your credentials:
```
PRIVATE_KEY=your_private_key
SEPOLIA_BASE_RPC=https://your-sepolia-base-rpc
BITLAYER_RPC=https://your-bitlayer-rpc
BEVM_RPC=https://your-bevm-rpc
```
🔹 Replace `your_private_key` with your wallet’s private key.  
🔹 Replace `your-sepolia-base-rpc`, `your-bitlayer-rpc`, and `your-bevm-rpc` with the correct RPC URLs for each network.

---

### 3️⃣ Run the Bot
Start the bot using:
```sh
node bot.js
```

This will initiate transactions and log the output in your terminal.

---

## How It Works
1. The bot automatically detects supported networks from your `.env` file.
2. It initiates **0.0001 ETH** transactions between all network pairs.
3. Logs all transaction statuses in real-time.
4. Stops after completing all transfers.

---

## Example Output
```sh
[INFO] Starting automated testnet transactions...
[INFO] Sending 0.0001 ETH from sepolia_base to bitlayer...
[SUCCESS] Transaction confirmed: 0xabc123...
[INFO] Sending 0.0001 ETH from sepolia_base to bevm...
[SUCCESS] Transaction confirmed: 0xdef456...
[INFO] All transfers completed!
```

---

## Troubleshooting
🔴 **Issue: Not enough ETH in wallet**
- Ensure your wallet has sufficient testnet ETH. Get some from a faucet.

🔴 **Issue: RPC errors**
- Double-check that your RPC URLs in `.env` are correct and active.

🔴 **Issue: Private key invalid**
- Ensure your private key is correct and properly formatted.

---

## Future Improvements
🔹 Add gas estimation before sending transactions  
🔹 Implement retry logic for failed transactions  
🔹 Support additional networks  

---

## License
This project is open-source and free to use. Modify it as needed!

---

## Feedback
for feedback still not available yet and will be added soon!

---

## Need Help?
If you encounter any issues, feel free to ask for help. Happy coding! 🚀

