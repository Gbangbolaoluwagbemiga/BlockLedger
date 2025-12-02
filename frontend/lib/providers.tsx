"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-ethers";
import { base } from "@reown/appkit/networks";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";

// Create Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [base],
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "YOUR_PROJECT_ID",
});

// Configure Reown AppKit
createAppKit({
  adapters: [wagmiAdapter],
  networks: [base],
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "YOUR_PROJECT_ID",
  metadata: {
    name: "BlockLedger",
    description: "Immutable accounting ledger on-chain",
    url:
      typeof window !== "undefined"
        ? window.location.origin
        : "https://blockledger.app",
    icons: [],
  },
  features: {
    analytics: true,
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
