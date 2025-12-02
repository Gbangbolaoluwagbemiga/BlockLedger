# BlockLedger

An immutable accounting ledger built on-chain using Solidity. Record income and expenses permanently on the blockchain with full transparency and verifiability.

## Features

- ✅ Record income and expense transactions
- ✅ Categorize transactions
- ✅ View transaction history
- ✅ Calculate user balances
- ✅ Immutable transaction records
- ✅ Fully transparent and verifiable

## Contract Functions

### `recordTransaction`

Record a new transaction (income or expense)

- Parameters: description, amount, isIncome, category

### `getTransaction`

Get details of a specific transaction by ID

### `getUserTransactionIds`

Get all transaction IDs for a specific user

### `getUserBalance`

Calculate net balance (income - expenses) for a user

### `getTotalTransactions`

Get total number of transactions in the ledger

### `getUserTransactionCount`

Get number of transactions for a specific user

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

3. Add your private key and RPC URLs to `.env`:

```
PRIVATE_KEY=your_private_key_here
BASE_RPC_URL=https://mainnet.base.org
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASESCAN_API_KEY=your_api_key_here (optional)
```

## Compile

```bash
npm run compile
```

## Deploy

### Deploy to Base Mainnet:

```bash
npm run deploy:base
```

### Deploy to Base Sepolia Testnet:

```bash
npm run deploy:base-sepolia
```

## Usage Example

After deployment, you can interact with the contract:

```javascript
// Record an income transaction
await blockLedger.recordTransaction(
  "Freelance payment",
  ethers.parseEther("1.5"), // 1.5 ETH
  true, // isIncome
  "Work"
);

// Record an expense transaction
await blockLedger.recordTransaction(
  "Coffee purchase",
  ethers.parseEther("0.01"), // 0.01 ETH
  false, // isIncome
  "Food"
);

// Get user balance
const balance = await blockLedger.getUserBalance(userAddress);
```

## Network Information

- **Base Mainnet**: Chain ID 8453
- **Base Sepolia Testnet**: Chain ID 84532

## Security Notes

- ⚠️ Never commit your `.env` file to version control
- ⚠️ Keep your private key secure
- ⚠️ Test on testnet before deploying to mainnet

## License

MIT
