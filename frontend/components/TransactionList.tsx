"use client";

import { useBlockLedger, useTransaction } from "@/hooks/useBlockLedger";
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
import { format } from "date-fns";
import { ArrowUpCircle, ArrowDownCircle, Loader2 } from "lucide-react";
import { ethers } from "ethers";

export function TransactionList() {
  const { transactionIds, address } = useBlockLedger();

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
        <CardTitle>Your Transactions</CardTitle>
        <CardDescription>View all your recorded transactions</CardDescription>
      </CardHeader>
      <CardContent>
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
            {transactionIds
              .slice()
              .reverse()
              .map((id) => (
                <TransactionRow key={id.toString()} transactionId={id} />
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function TransactionRow({ transactionId }: { transactionId: bigint }) {
  const { transaction, isLoading } = useTransaction(transactionId);

  if (isLoading || !transaction) {
    return (
      <TableRow>
        <TableCell colSpan={5} className="text-center">
          <Loader2 className="h-4 w-4 animate-spin inline" />
        </TableCell>
      </TableRow>
    );
  }

  const amount = Number(ethers.formatEther(transaction.amount));
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
