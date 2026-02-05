"use client";

import { use } from "react";
import { SidebarNavigation } from "@/components/SidebarNavigation";
import { MobileNav } from "@/components/MobileNav";
import { MOCK_GROUPS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, CreditCard, ShieldCheck, Zap, Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CheckoutPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = use(params);
  const group = MOCK_GROUPS.find(g => g.id === groupId);

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

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="flex w-full max-w-7xl">
        {/* Left Sidebar */}
        <div className="hidden sm:block w-16 lg:w-72 xl:w-80 shrink-0">
          <SidebarNavigation />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-2xl sm:border-x border-border bg-gray-50/50 min-h-screen flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border flex items-center gap-4 px-4 py-3">
            <Link href={`/profile/${group.creator.handle}`}>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-black font-headline tracking-tighter">Checkout</h1>
          </div>

          <div className="p-4 sm:p-8 max-w-lg mx-auto w-full space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-3xl bg-primary/10 mb-2">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-black font-headline tracking-tight">Unlock Exclusive Flow</h2>
              <p className="text-muted-foreground">Subscribe to get real-time alerts and trades from @{group.creator.handle}</p>
            </div>

            <Card className="border-primary/20 shadow-xl shadow-primary/5">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 rounded-xl">
                    <AvatarImage src={group.avatar} />
                    <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-bold">{group.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">by @{group.creator.handle}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm">Real-time options trade alerts</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm">Exclusive group chat & updates</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm">Market analysis & whale watching</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between font-bold">
                  <span>Monthly Subscription</span>
                  <span className="text-primary">${group.monthlyPrice}/mo</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full h-12 rounded-full font-bold text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                  Subscribe Now
                </Button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                  <ShieldCheck className="h-4 w-4" />
                  Secure payment via TradeStream Pay
                </div>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-border">
                <CreditCard className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-1">Billing cycle</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You will be charged ${group.monthlyPrice} today, and then every month on this date. Cancel anytime in your settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
