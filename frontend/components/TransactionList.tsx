"use client";

import { useBlockLedger, Transaction } from "@/hooks/useBlockLedger";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Loader2,
  ArrowUpDown,
} from "lucide-react";
import { formatEther } from "viem";
import { useState, useMemo } from "react";
import { useReadContract } from "wagmi";
import { BLOCKLEDGER_ABI, BLOCKLEDGER_ADDRESS } from "@/lib/contract";

type SortOption =
  | "newest"
  | "oldest"
  | "amount-high"
  | "amount-low"
  | "income"
  | "expense";

export function TransactionList() {
  const { transactionIds, address } = useBlockLedger();
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Fetch all transactions at once using getTransactions
  const { data: transactionsData, isLoading } = useReadContract({
    address: BLOCKLEDGER_ADDRESS,
    abi: BLOCKLEDGER_ABI,
    functionName: "getTransactions",
    args: transactionIds.length > 0 ? [transactionIds] : undefined,
    query: {
      enabled: transactionIds.length > 0,
    },
  });

  // Transform contract data to Transaction objects
  const transactions = useMemo(() => {
    if (!transactionsData) return [];

    return transactionsData.map(
      (tx: any) =>
        ({
          id: tx.id,
          creator: tx.creator,
          description: tx.description,
          amount: tx.amount,
          isIncome: tx.isIncome,
          timestamp: tx.timestamp,
          category: tx.category,
        } as Transaction)
    );
  }, [transactionsData]);

  // Filter and sort transactions
  const sortedTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Apply filters
    if (sortBy === "income") {
      filtered = filtered.filter((t) => t.isIncome);
    } else if (sortBy === "expense") {
      filtered = filtered.filter((t) => !t.isIncome);
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        return filtered.sort(
          (a, b) => Number(b.timestamp) - Number(a.timestamp)
        );
      case "oldest":
        return filtered.sort(
          (a, b) => Number(a.timestamp) - Number(b.timestamp)
        );
      case "amount-high":
        return filtered.sort((a, b) => Number(b.amount) - Number(a.amount));
      case "amount-low":
        return filtered.sort((a, b) => Number(a.amount) - Number(b.amount));
      case "income":
      case "expense":
        // Already filtered, sort by newest
        return filtered.sort(
          (a, b) => Number(b.timestamp) - Number(a.timestamp)
        );
      default:
        return filtered;
    }
  }, [transactions, sortBy]);

  if (!address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Transactions</CardTitle>
          <CardDescription>
            Connect your wallet to view transactions
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (transactionIds.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Transactions</CardTitle>
          <CardDescription>No transactions recorded yet</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle>Your Transactions</CardTitle>
            <CardDescription>
              View all your recorded transactions
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortOption)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="amount-high">Amount: High to Low</SelectItem>
                <SelectItem value="amount-low">Amount: Low to High</SelectItem>
                <SelectItem value="income">Income Only</SelectItem>
                <SelectItem value="expense">Expense Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : sortedTransactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No transactions found
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id.toString()}
                  transaction={transaction}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const amount = Number(formatEther(transaction.amount));
  const date = new Date(Number(transaction.timestamp) * 1000);

  return (
    <TableRow>
      <TableCell>
        {transaction.isIncome ? (
          <Badge variant="default" className="bg-green-500">
            <ArrowUpCircle className="h-3 w-3 mr-1" />
            Income
          </Badge>
        ) : (
          <Badge variant="destructive">
            <ArrowDownCircle className="h-3 w-3 mr-1" />
            Expense
          </Badge>
        )}
      </TableCell>
      <TableCell className="font-medium">{transaction.description}</TableCell>
      <TableCell
        className={transaction.isIncome ? "text-green-600" : "text-red-600"}
      >
        {transaction.isIncome ? "+" : "-"}
        {amount.toFixed(6)} ETH
      </TableCell>
      <TableCell>
        <Badge variant="outline">{transaction.category}</Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {format(date, "MMM d, yyyy HH:mm")}
      </TableCell>
    </TableRow>
  );
}
