
"use client";

import { use } from "react";
import { SidebarNavigation } from "@/components/SidebarNavigation";
import { RightSidebar } from "@/components/RightSidebar";
import { MobileNav } from "@/components/MobileNav";
import { MOCK_GROUPS, MOCK_TRADES, MOCK_MEMBERSHIPS } from "@/lib/mock-data";
import { TradeCard } from "@/components/TradeCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Verified, Lock, Users, Bell, Megaphone, Info } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function GroupDetailPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = use(params);
  const currentUserId = 'u4';

  const group = MOCK_GROUPS.find(g => g.id === groupId);
  const isMember = MOCK_MEMBERSHIPS.some(m => m.groupId === groupId && m.userId === currentUserId);
  const groupTrades = MOCK_TRADES.filter(t => t.groupId === groupId);

  if (!group) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Group not found</h1>
          <Link href="/groups">
            <Button variant="link">Return to groups</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Mock "messages/updates" from the owner
  const groupUpdates = [
    {
      id: 'up1',
      text: "Just spotted a massive $TSLA order. Posting the full trade details in the feed now. This could be a huge mover for the week.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    },
    {
      id: 'up2',
      text: "Welcome to all new members! Remember to manage your risk and stay disciplined. The goal is long-term growth.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    }
  ];

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="flex w-full max-w-7xl">
        {/* Left Sidebar */}
        <div className="hidden sm:block w-16 lg:w-72 xl:w-80 shrink-0">
          <SidebarNavigation />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-2xl sm:border-x border-border bg-white min-h-screen flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <Link href="/groups">
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-base font-black font-headline tracking-tighter flex items-center gap-1">
                  {group.name}
                  {isMember && <Lock className="h-3 w-3 text-primary" />}
                </h1>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest flex items-center gap-1">
                  {group.memberCount.toLocaleString()} Members · Exclusive Feed
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Info className="h-5 w-5" />
            </Button>
          </div>

          {/* Group Profile Header */}
          <div className="p-6 border-b border-border bg-gradient-to-b from-primary/5 to-white">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 rounded-2xl shadow-xl shadow-primary/10">
                <AvatarImage src={group.avatar} />
                <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black font-headline tracking-tight">{group.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      Managed by <span className="font-bold text-primary">@{group.creator.handle}</span>
                      {group.creator.verified && <Verified className="h-3.5 w-3.5 inline ml-1 text-primary fill-primary text-primary-foreground" />}
                    </p>
                  </div>
                  {!isMember && (
                    <Button className="rounded-full font-bold h-9 bg-primary hover:bg-primary/90">
                      Join Group
                    </Button>
                  )}
                </div>
                <p className="text-sm mt-3 leading-relaxed text-foreground/80">
                  {group.description}
                </p>
              </div>
            </div>
          </div>

          {!isMember ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
              <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-2">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-black font-headline">This group is private</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                Join this community to access exclusive order flow alerts, trade updates, and direct insights from @{group.creator.handle}.
              </p>
              <Button className="rounded-full font-bold h-12 px-8 bg-primary hover:bg-primary/90 text-lg">
                Subscribe for ${group.monthlyPrice}/mo
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="trades" className="flex-1 flex flex-col">
              <TabsList className="w-full h-12 bg-transparent rounded-none p-0 border-b border-border">
                <TabsTrigger 
                  value="trades" 
                  className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:shadow-none font-bold text-muted-foreground data-[state=active]:text-foreground"
                >
                  Group Trades
                </TabsTrigger>
                <TabsTrigger 
                  value="updates" 
                  className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:shadow-none font-bold text-muted-foreground data-[state=active]:text-foreground"
                >
                  Updates
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="trades" className="flex-1 m-0 divide-y divide-border">
                {groupTrades.length > 0 ? (
                  groupTrades.map((trade) => (
                    <TradeCard key={trade.id} trade={trade} />
                  ))
                ) : (
                  <div className="p-12 text-center text-muted-foreground">
                    <p>No group-exclusive trades posted yet.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="updates" className="flex-1 m-0 divide-y divide-border">
                {groupUpdates.map((update) => (
                  <div key={update.id} className="p-4 hover:bg-muted/10 transition-colors">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={group.creator.avatar} />
                        <AvatarFallback>{group.creator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-sm">{group.creator.name}</span>
                          <Badge variant="secondary" className="text-[10px] h-4 font-bold bg-primary/10 text-primary uppercase">Owner</Badge>
                          <span className="text-muted-foreground text-[10px] ml-auto">
                            {new Date(update.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-foreground/90">
                          {update.text}
                        </p>
                        <div className="flex gap-4 pt-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <Megaphone className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <Bell className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          )}
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
