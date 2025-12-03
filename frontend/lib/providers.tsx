"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { http } from "wagmi";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

// Create Wagmi adapter for Reown (it will create the wagmi config internally)
const wagmiAdapter = new WagmiAdapter({
  networks: [base],
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "YOUR_PROJECT_ID",
  transports: {
    [base.id]: http(),
  },
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

  // Get the wagmi config from the adapter
  const wagmiConfig = wagmiAdapter.wagmiConfig;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
