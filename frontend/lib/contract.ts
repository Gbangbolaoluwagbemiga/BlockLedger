// BlockLedger Contract ABI
export const BLOCKLEDGER_ABI = [
  {
    inputs: [
      { internalType: "string", name: "_description", type: "string" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "bool", name: "_isIncome", type: "bool" },
      { internalType: "string", name: "_category", type: "string" },
    ],
    name: "recordTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "getTransaction",
    outputs: [
      { internalType: "uint256", name: "transactionId", type: "uint256" },
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "string", name: "description", type: "string" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bool", name: "isIncome", type: "bool" },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
      { internalType: "string", name: "category", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserTransactionIds",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserBalance",
    outputs: [{ internalType: "int256", name: "userBalance", type: "int256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalTransactions",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserTransactionCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256[]", name: "_ids", type: "uint256[]" }],
    name: "getTransactions",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "creator", type: "address" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bool", name: "isIncome", type: "bool" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
          { internalType: "string", name: "category", type: "string" },
        ],
        internalType: "struct BlockLedger.Transaction[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      { indexed: false, internalType: "bool", name: "isIncome", type: "bool" },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "category",
        type: "string",
      },
    ],
    name: "TransactionRecorded",
    type: "event",
  },
] as const;

// Contract address on Base Mainnet
export const BLOCKLEDGER_ADDRESS =
  "0xf4B8c39F0f5C7cB1bA3dFb9CbCAd9aA697236277" as const;

// Base Mainnet chain ID
export const BASE_CHAIN_ID = 8453;
