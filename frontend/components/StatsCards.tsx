"use client";

import { useBlockLedger } from "@/hooks/useBlockLedger";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet, TrendingUp, TrendingDown, FileText } from "lucide-react";
import { formatEther } from "ethers";

export function StatsCards() {
  const { balance, totalTransactions, address } = useBlockLedger();

  if (!address) {
    return null;
  }

  const balanceFormatted = Number(balance).toFixed(6);
  const isPositive = balance >= 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "+" : ""}
            {balanceFormatted} ETH
          </div>
          <p className="text-xs text-muted-foreground">Income minus expenses</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Transactions
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTransactions}</div>
          <p className="text-xs text-muted-foreground">
            All transactions on-chain
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Your Transactions
          </CardTitle>
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Active</div>
          <p className="text-xs text-muted-foreground">
            Ledger is live on Base
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
