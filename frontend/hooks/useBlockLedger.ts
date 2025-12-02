"use client";

import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "@reown/appkit-adapter-ethers/react";
import { ethers } from "ethers";
import { BLOCKLEDGER_ABI, BLOCKLEDGER_ADDRESS } from "@/lib/contract";

export interface Transaction {
  id: bigint;
  creator: string;
  description: string;
  amount: bigint;
  isIncome: boolean;
  timestamp: bigint;
  category: string;
}

export function useBlockLedger() {
  const { address, isConnected } = useAccount();

  // Get user balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: BLOCKLEDGER_ADDRESS,
    abi: BLOCKLEDGER_ABI,
    functionName: "getUserBalance",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Get user transaction IDs
  const { data: transactionIds, refetch: refetchTransactions } =
    useReadContract({
      address: BLOCKLEDGER_ADDRESS,
      abi: BLOCKLEDGER_ABI,
      functionName: "getUserTransactionIds",
      args: address ? [address] : undefined,
      query: {
        enabled: !!address,
      },
    });

  // Get total transactions
  const { data: totalTransactions } = useReadContract({
    address: BLOCKLEDGER_ADDRESS,
    abi: BLOCKLEDGER_ABI,
    functionName: "getTotalTransactions",
  });

  // Write contract for recording transactions
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const recordTransaction = async (
    description: string,
    amount: string, // in ETH
    isIncome: boolean,
    category: string
  ) => {
    if (!address) throw new Error("Wallet not connected");

    const amountWei = ethers.parseEther(amount);

    await writeContract({
      address: BLOCKLEDGER_ADDRESS,
      abi: BLOCKLEDGER_ABI,
      functionName: "recordTransaction",
      args: [description, amountWei, isIncome, category],
    });
  };

  return {
    address,
    isConnected,
    balance: balance ? Number(balance) / 1e18 : 0,
    transactionIds: transactionIds || [],
    totalTransactions: totalTransactions ? Number(totalTransactions) : 0,
    recordTransaction,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
    refetchBalance,
    refetchTransactions,
  };
}

export function useTransaction(transactionId: bigint | undefined) {
  const { data, isLoading, error } = useReadContract({
    address: BLOCKLEDGER_ADDRESS,
    abi: BLOCKLEDGER_ABI,
    functionName: "getTransaction",
    args: transactionId ? [transactionId] : undefined,
    query: {
      enabled: !!transactionId,
    },
  });

  if (!data) return { transaction: null, isLoading, error };

  const [id, creator, description, amount, isIncome, timestamp, category] =
    data;

  return {
    transaction: {
      id,
      creator,
      description,
      amount,
      isIncome,
      timestamp,
      category,
    } as Transaction,
    isLoading,
    error,
  };
}
