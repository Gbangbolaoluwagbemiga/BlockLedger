"use client";

import { useAccount, useDisconnect } from "@reown/appkit-adapter-ethers/react";
import { Button } from "@/components/ui/button";
import { useAppKit } from "@reown/appkit/react";
import { Wallet, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="font-mono text-sm">
          {address.slice(0, 6)}...{address.slice(-4)}
        </Badge>
        <Button variant="outline" size="sm" onClick={() => disconnect()}>
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => open()} className="gap-2">
      <Wallet className="h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
