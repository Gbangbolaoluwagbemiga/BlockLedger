# BlockLedger Frontend

A beautiful, modern frontend for BlockLedger - an immutable accounting ledger on Base blockchain.

## ⚠️ Important Setup Step

**You MUST set your Reown Project ID before running the app!**

1. Get your Project ID from [https://cloud.reown.com](https://cloud.reown.com)
2. Create a `.env.local` file in the `frontend` directory:
   ```bash
   echo "NEXT_PUBLIC_REOWN_PROJECT_ID=your_actual_project_id_here" > .env.local
   ```
3. Replace `your_actual_project_id_here` with your actual Reown Project ID

Without a valid Project ID, wallet connection will not work properly.

## Features

- 🔗 **Wallet Connection** - Connect using Reown (WalletConnect) with support for multiple wallets
- 📊 **Transaction Dashboard** - View your balance, total transactions, and transaction history
- ➕ **Record Transactions** - Add income and expense transactions on-chain
- 🎨 **Beautiful UI** - Built with shadcn/ui and Tailwind CSS
- 🔒 **On-Chain** - All transactions are permanently recorded on Base blockchain

## Quick Start

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

```bash
# Create .env.local file
echo "NEXT_PUBLIC_REOWN_PROJECT_ID=your_project_id_here" > .env.local
```

3. **Run the development server:**

```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Build for Production

```bash
npm run build
npm start
```

## Contract Information

- **Contract Address:** `0xf4B8c39F0f5C7cB1bA3dFb9CbCAd9aA697236277`
- **Network:** Base Mainnet (Chain ID: 8453)
- **Explorer:** [View on BaseScan](https://basescan.org/address/0xf4B8c39F0f5C7cB1bA3dFb9CbCAd9aA697236277)

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Wallet:** Reown AppKit (WalletConnect) with Wagmi
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Blockchain:** Wagmi + Viem
- **State Management:** TanStack Query

## Troubleshooting

### Wallet Connection Issues

- Make sure `NEXT_PUBLIC_REOWN_PROJECT_ID` is set in `.env.local`
- Check that you're on Base network in your wallet
- Ensure you have some ETH for gas fees

### Build Errors

- The build uses webpack (not Turbopack) for stability
- Optional wallet connectors are automatically ignored
- If you see module resolution errors, try deleting `node_modules` and running `npm install` again

### Reown Config Error (403)

- This happens when `NEXT_PUBLIC_REOWN_PROJECT_ID` is set to `YOUR_PROJECT_ID` (placeholder)
- Get a real Project ID from [cloud.reown.com](https://cloud.reown.com)

## License

MIT
