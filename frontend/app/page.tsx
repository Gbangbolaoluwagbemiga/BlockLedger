"use client";

import { ConnectWallet } from "@/components/ConnectWallet";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { StatsCards } from "@/components/StatsCards";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BookOpen, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">BlockLedger</h1>
              <p className="text-sm text-muted-foreground">
                Immutable accounting on-chain
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <ConnectWallet />
          </div>
        </header>

        {/* Stats Cards */}
        <div className="mb-8">
          <StatsCards />
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <TransactionForm />
          </div>
          <div>
            <TransactionList />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-card border rounded-lg">
          <div className="flex items-start gap-4">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold mb-2">On-Chain & Immutable</h3>
              <p className="text-sm text-muted-foreground mb-4">
                All transactions are permanently recorded on Base blockchain.
                Your ledger is transparent, verifiable, and cannot be altered.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-muted rounded">
                  Contract: 0xf4B8...6277
                </span>
                <span className="px-2 py-1 bg-muted rounded">
                  Network: Base Mainnet
                </span>
                <a
                  href="https://basescan.org/address/0xf4B8c39F0f5C7cB1bA3dFb9CbCAd9aA697236277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                >
                  View on BaseScan →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
