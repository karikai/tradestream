
"use client";

import { SidebarNavigation } from "@/components/SidebarNavigation";
import { RightSidebar } from "@/components/RightSidebar";
import { MobileNav } from "@/components/MobileNav";
import { MOCK_TRADES } from "@/lib/mock-data";
import { TradeCard } from "@/components/TradeCard";
import { Bookmark, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookmarksPage() {
  // For demonstration, showing a subset of trades as "bookmarked"
  const bookmarkedTrades = MOCK_TRADES.slice(0, 3);

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
            <div className="flex flex-col">
              <h1 className="text-xl font-black font-headline tracking-tighter">Bookmarks</h1>
              <p className="text-xs text-muted-foreground">@johndoe_trading</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          <div className="divide-y divide-border">
            {bookmarkedTrades.length > 0 ? (
              bookmarkedTrades.map((trade) => (
                <TradeCard key={trade.id} trade={trade} />
              ))
            ) : (
              <div className="p-12 text-center py-20">
                <div className="max-w-xs mx-auto space-y-4">
                  <h2 className="text-3xl font-black tracking-tight font-headline">Save trades for later</h2>
                  <p className="text-muted-foreground">
                    Don’t let the big wins get away! Bookmark trades to easily find them again and study the flow.
                  </p>
                </div>
              </div>
            )}
            
            {bookmarkedTrades.length > 0 && (
              <div className="p-8 text-center bg-muted/5">
                <p className="text-sm text-muted-foreground italic">
                  End of your bookmarked trades.
                </p>
              </div>
            )}
          </div>
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
