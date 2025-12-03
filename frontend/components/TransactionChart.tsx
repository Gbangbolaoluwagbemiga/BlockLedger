"use client";

import { useBlockLedger, Transaction } from "@/hooks/useBlockLedger";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useReadContract } from "wagmi";
import { BLOCKLEDGER_ABI, BLOCKLEDGER_ADDRESS } from "@/lib/contract";
import { useMemo } from "react";
import { formatEther } from "viem";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const COLORS = {
  income: "#22c55e", // green-500
  expense: "#ef4444", // red-500
};

export function TransactionChart() {
  const { transactionIds, address } = useBlockLedger();

  // Fetch all transactions
  const { data: transactionsData, isLoading } = useReadContract({
    address: BLOCKLEDGER_ADDRESS,
    abi: BLOCKLEDGER_ABI,
    functionName: "getTransactions",
    args: transactionIds.length > 0 ? [transactionIds] : undefined,
    query: {
      enabled: transactionIds.length > 0 && !!address,
    },
  });

  // Process transaction data for charts
  const chartData = useMemo(() => {
    if (!transactionsData)
      return {
        monthlyData: [],
        pieData: [],
        totals: { income: 0, expense: 0 },
      };

    const transactions = transactionsData.map((tx: any) => ({
      id: tx.id,
      amount: Number(formatEther(tx.amount)),
      isIncome: tx.isIncome,
      timestamp: Number(tx.timestamp),
    }));

    // Calculate totals
    const totals = transactions.reduce(
      (acc: { income: number; expense: number }, tx: any) => {
        if (tx.isIncome) {
          acc.income += tx.amount;
        } else {
          acc.expense += tx.amount;
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );

    // Group by month
    const monthlyMap = new Map<
      string,
      { income: number; expense: number; month: string }
    >();

    transactions.forEach((tx: any) => {
      const date = new Date(tx.timestamp * 1000);
      const monthKey = date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, { income: 0, expense: 0, month: monthKey });
      }

      const monthData = monthlyMap.get(monthKey)!;
      if (tx.isIncome) {
        monthData.income += tx.amount;
      } else {
        monthData.expense += tx.amount;
      }
    });

    const monthlyData = Array.from(monthlyMap.values()).sort((a, b) => {
      return new Date(a.month).getTime() - new Date(b.month).getTime();
    });

    // Pie chart data
    const pieData = [
      { name: "Income", value: totals.income, color: COLORS.income },
      { name: "Expenses", value: totals.expense, color: COLORS.expense },
    ];

    return { monthlyData, pieData, totals };
  }, [transactionsData]);

  if (!address) {
    return null;
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction Overview</CardTitle>
          <CardDescription>Loading chart data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (transactionIds.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction Overview</CardTitle>
          <CardDescription>No transaction data to display</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Bar Chart - Monthly Income vs Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
          <CardDescription>Income vs Expenses by month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `${value.toFixed(4)} ETH`}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Legend />
              <Bar dataKey="income" fill={COLORS.income} name="Income" />
              <Bar dataKey="expense" fill={COLORS.expense} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart - Total Income vs Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>Total Breakdown</CardTitle>
          <CardDescription>Overall income vs expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData.pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(1)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value.toFixed(4)} ETH`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Income</p>
                  <p className="text-lg font-semibold text-green-600">
                    +{chartData.totals.income.toFixed(4)} ETH
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <TrendingDown className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Expenses
                  </p>
                  <p className="text-lg font-semibold text-red-600">
                    -{chartData.totals.expense.toFixed(4)} ETH
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
