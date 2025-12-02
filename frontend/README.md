# BlockLedger Frontend

A beautiful, modern frontend for BlockLedger - an immutable accounting ledger on Base blockchain.

## Features

- 🔗 **Wallet Connection** - Connect using Reown (WalletConnect) with support for multiple wallets
- 📊 **Transaction Dashboard** - View your balance, total transactions, and transaction history
- ➕ **Record Transactions** - Add income and expense transactions on-chain
- 🎨 **Beautiful UI** - Built with shadcn/ui and Tailwind CSS
- 🔒 **On-Chain** - All transactions are permanently recorded on Base blockchain

## Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**

```bash
cp .env.local.example .env.local
```

3. **Get your Reown Project ID:**

   - Visit [https://cloud.reown.com](https://cloud.reown.com)
   - Create a new project
   - Copy your Project ID
   - Add it to `.env.local`:

   ```
   NEXT_PUBLIC_REOWN_PROJECT_ID=your_project_id_here
   ```

4. **Run the development server:**

```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

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
- **Wallet:** Reown AppKit (WalletConnect)
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Blockchain:** Ethers.js v6
- **State Management:** TanStack Query

## Project Structure

```
frontend/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   ├── ConnectWallet.tsx
│   ├── TransactionForm.tsx
│   ├── TransactionList.tsx
│   └── StatsCards.tsx
├── hooks/           # Custom React hooks
│   └── useBlockLedger.ts
└── lib/             # Utilities and config
    ├── contract.ts  # Contract ABI and address
    └── providers.tsx # Reown and Query providers
```

## License

MIT
