
"use client";

import { SidebarNavigation } from "@/components/SidebarNavigation";
import { RightSidebar } from "@/components/RightSidebar";
import { MobileNav } from "@/components/MobileNav";
import { MOCK_TRADES } from "@/lib/mock-data";
import { TradeCard } from "@/components/TradeCard";
import { TrendingUp, Trophy, Flame, BarChart3 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function TrendsPage() {
  // Sort trades by highest return percentage
  const topGains = [...MOCK_TRADES]
    .filter(t => (t.returnPercentage || 0) > 0)
    .sort((a, b) => (b.returnPercentage || 0) - (a.returnPercentage || 0));

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="flex w-full max-w-7xl">
        {/* Left Sidebar */}
        <div className="hidden sm:block w-16 lg:w-72 xl:w-80 shrink-0">
          <SidebarNavigation />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-2xl sm:border-x border-border bg-white">
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 py-4">
            <h1 className="text-xl font-black font-headline tracking-tighter flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Trends
            </h1>
          </div>

          {/* Hero Trends Section */}
          <div className="p-6 bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-black font-headline tracking-tight">Whale Watch</h2>
                <p className="text-sm text-muted-foreground">The most profitable moves from the last 24 hours.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/50 backdrop-blur-sm p-3 rounded-xl border border-border">
                <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Top Ticker</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-primary">$NVDA</span>
                  <Badge className="bg-accent text-accent-foreground">+420%</Badge>
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-3 rounded-xl border border-border">
                <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Hot Sector</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-primary">Tech</span>
                  <Flame className="h-4 w-4 text-accent fill-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="gains" className="w-full">
            <TabsList className="w-full h-12 bg-transparent rounded-none p-0 border-b border-border">
              <TabsTrigger 
                value="gains" 
                className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:shadow-none font-bold text-muted-foreground data-[state=active]:text-foreground"
              >
                Top Gains
              </TabsTrigger>
              <TabsTrigger 
                value="volume" 
                className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:shadow-none font-bold text-muted-foreground data-[state=active]:text-foreground"
              >
                High Volume
              </TabsTrigger>
            </TabsList>
            <TabsContent value="gains" className="m-0 divide-y divide-border">
              {topGains.length > 0 ? (
                topGains.map((trade) => (
                  <TradeCard key={trade.id} trade={trade} />
                ))
              ) : (
                <div className="p-12 text-center text-muted-foreground">
                  No high return trades found yet.
                </div>
              )}
            </TabsContent>
            <TabsContent value="volume" className="m-0 p-12 text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Volume analytics are being updated...</p>
            </TabsContent>
          </Tabs>
        </main>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80 lg:w-96 shrink-0">
          <RightSidebar />
        </div>
      </div>

      {/* Mobile Nav */}
      <MobileNav />
    </div>
  );
}
