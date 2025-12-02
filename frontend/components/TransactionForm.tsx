"use client";

import { useState } from "react";
import { useBlockLedger } from "@/hooks/useBlockLedger";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

const CATEGORIES = [
  "Work",
  "Freelance",
  "Investment",
  "Gift",
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
];

export function TransactionForm() {
  const {
    recordTransaction,
    isPending,
    isConfirming,
    isConfirmed,
    refetchBalance,
    refetchTransactions,
  } = useBlockLedger();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [isIncome, setIsIncome] = useState(true);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !category) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await recordTransaction(description, amount, isIncome, category);
      toast.success("Transaction submitted!");
      setDescription("");
      setAmount("");
      setCategory("");
    } catch (error: any) {
      toast.error(error?.message || "Failed to record transaction");
    }
  };

  // Refetch data when transaction is confirmed
  if (isConfirmed) {
    refetchBalance();
    refetchTransactions();
  }

  const isLoading = isPending || isConfirming;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Transaction</CardTitle>
        <CardDescription>
          Add a new income or expense to your ledger
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={isIncome ? "default" : "outline"}
              onClick={() => setIsIncome(true)}
              className="flex-1"
            >
              Income
            </Button>
            <Button
              type="button"
              variant={!isIncome ? "default" : "outline"}
              onClick={() => setIsIncome(false)}
              className="flex-1"
            >
              Expense
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="e.g., Freelance payment, Coffee purchase..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (ETH)</Label>
              <Input
                id="amount"
                type="number"
                step="0.000001"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isConfirming ? "Confirming..." : "Processing..."}
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Record Transaction
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
