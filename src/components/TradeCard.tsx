"use client";

import { Trade } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpRight, ArrowDownRight, MessageSquare, Repeat2, Heart, Share, Verified, Flame, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TradeCardProps {
  trade: Trade;
}

export function TradeCard({ trade }: TradeCardProps) {
  const isCall = trade.optionType === "call";
  const isProfitable = (trade.profitAmount ?? 0) > 0;
  
  const totalCostOpen = trade.averageCost * trade.contractsPurchased;
  const totalValueClose = (trade.priceAtClose ?? 0) * (trade.contractsSold ?? 0);

  return (
    <Card className="rounded-none border-x-0 border-t-0 shadow-none hover:bg-muted/30 transition-colors cursor-pointer p-4 group">
      <div className="flex gap-3">
        <Link href={`/profile/${trade.user.handle}`} className="shrink-0" onClick={(e) => e.stopPropagation()}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={trade.user.avatar} alt={trade.user.name} />
            <AvatarFallback>{trade.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-1">
            <Link 
              href={`/profile/${trade.user.handle}`} 
              className="font-bold text-sm hover:underline flex items-center gap-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              {trade.user.name}
              {trade.user.verified && <Verified className="h-3.5 w-3.5 text-primary fill-primary text-primary-foreground" />}
            </Link>
            <span className="text-muted-foreground text-sm">@{trade.user.handle}</span>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm hover:underline">
              {formatDistanceToNow(new Date(trade.timestamp))} ago
            </span>
          </div>
          
          <div className="pt-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-lg font-black font-headline text-primary">${trade.ticker}</span>
              <Badge variant={isCall ? "default" : "destructive"} className={cn(
                "font-bold uppercase tracking-wider text-[10px]",
                isCall && "bg-accent text-accent-foreground hover:bg-accent/90"
              )}>
                {trade.optionType}
              </Badge>
              <span className="text-sm font-medium">
                ${trade.strikePrice} Exp {new Date(trade.expirationDate).toLocaleDateString()}
              </span>
            </div>
            
            <div className="border border-border rounded-lg overflow-hidden bg-muted/10">
              {/* Row 1: Opening Position */}
              <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
                <div className="p-2.5">
                  <p className="text-[9px] uppercase text-muted-foreground font-black tracking-wider mb-1 leading-none">Avg Cost (Open)</p>
                  <p className="text-sm font-bold tabular-nums">${trade.averageCost.toFixed(2)}</p>
                </div>
                <div className="p-2.5">
                  <p className="text-[9px] uppercase text-muted-foreground font-black tracking-wider mb-1 leading-none">Contracts</p>
                  <p className="text-sm font-bold tabular-nums">{trade.contractsPurchased.toLocaleString()}</p>
                </div>
                <div className="p-2.5 bg-primary/5">
                  <p className="text-[9px] uppercase text-primary/70 font-black tracking-wider mb-1 leading-none">Total Cost</p>
                  <p className="text-sm font-bold tabular-nums text-primary">${totalCostOpen.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              </div>

              {/* Row 2: Closing Position */}
              <div className="grid grid-cols-3 divide-x divide-border border-b border-border bg-gray-50/50">
                <div className="p-2.5">
                  <p className="text-[9px] uppercase text-muted-foreground font-black tracking-wider mb-1 leading-none">Avg Price (Close)</p>
                  <p className="text-sm font-bold tabular-nums">${trade.priceAtClose?.toFixed(2) ?? "—"}</p>
                </div>
                <div className="p-2.5">
                  <p className="text-[9px] uppercase text-muted-foreground font-black tracking-wider mb-1 leading-none">Sold</p>
                  <p className="text-sm font-bold tabular-nums">{trade.contractsSold?.toLocaleString() ?? "—"}</p>
                </div>
                <div className="p-2.5 bg-primary/5">
                  <p className="text-[9px] uppercase text-primary/70 font-black tracking-wider mb-1 leading-none">Total Value</p>
                  <p className="text-sm font-bold tabular-nums text-primary">
                    {trade.priceAtClose ? `$${totalValueClose.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
                  </p>
                </div>
              </div>

              {/* Row 3: Profitability Metrics */}
              <div className="grid grid-cols-3 divide-x divide-border">
                <div className="p-2.5 bg-background">
                  {/* Empty cell as requested */}
                </div>
                <div className="p-2.5 bg-background">
                  <p className="text-[9px] uppercase text-muted-foreground font-black tracking-wider mb-1 leading-none">Profit %</p>
                  <div className="flex items-center gap-1">
                    <p className={cn("text-sm font-black tabular-nums", isProfitable ? "text-accent" : "text-destructive")}>
                      {trade.profitPercentage ? `${isProfitable ? '+' : ''}${trade.profitPercentage}%` : "—"}
                    </p>
                  </div>
                </div>
                <div className="p-2.5 bg-background">
                  <p className="text-[9px] uppercase text-muted-foreground font-black tracking-wider mb-1 leading-none">Profit $</p>
                  <div className="flex items-center gap-1">
                    <p className={cn("text-sm font-black tabular-nums", isProfitable ? "text-accent" : "text-destructive")}>
                      {trade.profitAmount ? `${isProfitable ? '+' : ''}$${trade.profitAmount.toLocaleString()}` : "—"}
                    </p>
                    {trade.profitAmount !== undefined && (isProfitable ? <ArrowUpRight className="h-3.5 w-3.5 text-accent" /> : <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 max-w-sm">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                <div className="p-2 rounded-full group-hover:bg-primary/10">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <span className="text-xs">12</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group">
                <div className="p-2 rounded-full group-hover:bg-accent/10">
                  <Repeat2 className="h-4 w-4" />
                </div>
                <span className="text-xs">8</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors group">
                <div className="p-2 rounded-full group-hover:bg-destructive/10">
                  <Heart className="h-4 w-4" />
                </div>
                <span className="text-xs">45</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                <div className="p-2 rounded-full group-hover:bg-primary/10">
                  <Bookmark className="h-4 w-4" />
                </div>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                <div className="p-2 rounded-full group-hover:bg-primary/10">
                  <Share className="h-4 w-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
