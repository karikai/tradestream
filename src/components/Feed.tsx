"use client";

import { useState, useEffect } from "react";
import { MOCK_TRADES } from "@/lib/mock-data";
import { TradeCard } from "./TradeCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Feed() {
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading new trades
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 bg-white min-h-screen pb-24 sm:pb-0">
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border">
        {/* Mobile Header */}
        <div className="sm:hidden px-4 py-3 flex items-center justify-between">
          <div className="w-8" />
          <Zap className="h-6 w-6 text-primary fill-primary" />
          <Link href="/dashboard/notifications">
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-muted/30 hover:text-primary transition-colors">
              <Bell className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Desktop Title */}
        <div className="hidden sm:flex px-4 py-4 items-center justify-between">
          <h1 className="text-xl font-black font-headline tracking-tighter">Home</h1>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full h-12 bg-transparent rounded-none p-0">
            <TabsTrigger 
              value="all" 
              className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:shadow-none font-bold text-muted-foreground data-[state=active]:text-foreground text-xs sm:text-sm"
            >
              All Trades
            </TabsTrigger>
            <TabsTrigger 
              value="following" 
              className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:shadow-none font-bold text-muted-foreground data-[state=active]:text-foreground text-xs sm:text-sm"
            >
              Following
            </TabsTrigger>
            <TabsTrigger 
              value="high-volume" 
              className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:shadow-none font-bold text-muted-foreground data-[state=active]:text-foreground text-xs sm:text-sm"
            >
              Whale Alert
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="divide-y divide-border">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 space-y-3 animate-pulse">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/4 bg-muted rounded" />
                  <div className="h-20 w-full bg-muted/50 rounded-lg" />
                </div>
              </div>
            </div>
          ))
        ) : (
          MOCK_TRADES.map((trade) => (
            <TradeCard key={trade.id} trade={trade} />
          ))
        )}
        
        {!isLoading && (
          <div className="p-8 sm:p-12 text-center space-y-2 bg-muted/5">
            <p className="font-bold text-primary">You're caught up!</p>
            <p className="text-sm text-muted-foreground">Follow more traders to see more activity.</p>
            <Button variant="link" className="text-primary font-bold">Find people to follow</Button>
          </div>
        )}
      </div>
    </div>
  );
}
