"use client";

import { Trade } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpRight, ArrowDownRight, MessageSquare, Repeat2, Heart, Share, Verified, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserData } from "@/models/user";
import { TradeData } from "@/models/trade";

interface TradeCardProps {
  trade: Trade;
  user: UserData;
}

export function TradeCard({ trade, user }: TradeCardProps) {


  const isCall = trade.optionType === "call";
  const isProfitable = (trade.profitAmount ?? 0) > 0;
  
  const totalCostOpen = trade.averageCost * trade.contractsPurchased;
  const totalValueClose = (trade.priceAtClose ?? 0) * (trade.contractsSold ?? 0);

  return (
    <Card className="rounded-none border-x-0 border-t-0 shadow-none hover:bg-muted/10 transition-colors cursor-pointer p-4 group">
      <div className="flex gap-3">
        <Link href={`/dashboard/profile/${user.username}`} className="shrink-0" onClick={(e) => e.stopPropagation()}>
          <Avatar className="h-10 w-10">
            {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-1">
            <Link 
              href={`/dashboard/profile/${user.username}`} 
              className="font-bold text-sm hover:underline flex items-center gap-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              {user.name}
              {user.verified && <Verified className="h-3.5 w-3.5 text-primary fill-primary text-primary-foreground" />}
            </Link>
            <span className="text-muted-foreground text-sm">@{user.username}</span>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm hover:underline">
              {formatDistanceToNow(new Date(trade.timestamp))} ago
            </span>
          </div>
          
          <div className="pt-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-lg font-black font-headline text-primary tracking-tighter">${trade.ticker}</span>
              <Badge variant={isCall ? "default" : "destructive"} className={cn(
                "font-black uppercase tracking-widest text-[9px] rounded-none px-1.5 h-4",
                isCall && "bg-accent text-accent-foreground hover:bg-accent/90"
              )}>
                {trade.optionType}
              </Badge>
              <span className="text-xs font-bold tabular-nums">
                ${trade.strikePrice} <span className="text-muted-foreground font-medium">EXP</span> {new Date(trade.expirationDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}
              </span>
            </div>
            
            <div className="border border-border bg-white shadow-sm overflow-hidden rounded-none">
              {/* Row 1: Opening Position */}
              <div className="grid grid-cols-3 border-b border-border">
                <div className="p-2 sm:p-3">
                  <p className="text-[8px] uppercase text-muted-foreground font-black tracking-[0.15em] mb-1 leading-none">Price In</p>
                  <p className="text-xs sm:text-sm font-bold tabular-nums text-foreground/90">${trade.averageCost.toFixed(2)}</p>
                </div>
                <div className="p-2 sm:p-3">
                  <p className="text-[8px] uppercase text-muted-foreground font-black tracking-[0.15em] mb-1 leading-none">Size</p>
                  <p className="text-xs sm:text-sm font-bold tabular-nums text-foreground/90">{trade.contractsPurchased.toLocaleString()}</p>
                </div>
                <div className="p-2 sm:p-3 text-right">
                  <p className="text-[8px] uppercase text-muted-foreground font-black tracking-[0.15em] mb-1 leading-none">Total In</p>
                  <p className="text-xs sm:text-sm font-black tabular-nums text-primary">${totalCostOpen.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              </div>

              {/* Row 2: Closing Position */}
              <div className="grid grid-cols-3 border-b border-border">
                <div className="p-2 sm:p-3">
                  <p className="text-[8px] uppercase text-muted-foreground font-black tracking-[0.15em] mb-1 leading-none">Price Out</p>
                  <p className="text-xs sm:text-sm font-bold tabular-nums text-foreground/90">${trade.priceAtClose?.toFixed(2) ?? "—"}</p>
                </div>
                <div className="p-2 sm:p-3">
                  <p className="text-[8px] uppercase text-muted-foreground font-black tracking-[0.15em] mb-1 leading-none">Sold</p>
                  <p className="text-xs sm:text-sm font-bold tabular-nums text-foreground/90">{trade.contractsSold?.toLocaleString() ?? "—"}</p>
                </div>
                <div className="p-2 sm:p-3 text-right">
                  <p className="text-[8px] uppercase text-muted-foreground font-black tracking-[0.15em] mb-1 leading-none">Total Out</p>
                  <p className="text-xs sm:text-sm font-black tabular-nums text-primary">
                    {trade.priceAtClose ? `$${totalValueClose.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
                  </p>
                </div>
              </div>

              {/* Row 3: Profitability Metrics */}
              <div className="grid grid-cols-3 bg-muted/5">
                <div className="p-2 sm:p-3">
                  {/* Ledger balancing space */}
                </div>
                <div className="p-2 sm:p-3">
                  <p className="text-[8px] uppercase text-muted-foreground font-black tracking-[0.15em] mb-1 leading-none">Gain %</p>
                  <p className={cn("text-xs sm:text-sm font-black tabular-nums", isProfitable ? "text-accent" : "text-destructive")}>
                    {trade.profitPercentage ? `${isProfitable ? '+' : ''}${trade.profitPercentage}%` : "—"}
                  </p>
                </div>
                <div className="p-2 sm:p-3 text-right">
                  <p className="text-[8px] uppercase text-muted-foreground font-black tracking-[0.15em] mb-1 leading-none">Net P/L</p>
                  <div className="flex items-center justify-end gap-1">
                    <p className={cn("text-xs sm:text-sm font-black tabular-nums", isProfitable ? "text-accent" : "text-destructive")}>
                      {trade.profitAmount ? `${isProfitable ? '+' : ''}$${trade.profitAmount.toLocaleString()}` : "—"}
                    </p>
                    {trade.profitAmount !== undefined && (isProfitable ? <ArrowUpRight className="h-3.5 w-3.5 text-accent" /> : <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 max-w-sm">
              <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors group/btn">
                {/* <div className="p-2 rounded-none group-hover/btn:bg-primary/5">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-bold">12</span> */}
              </button>
              <button className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors group/btn">
                {/* <div className="p-2 rounded-none group-hover/btn:bg-accent/5">
                  <Repeat2 className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-bold">8</span> */}
              </button>
              <button className="flex items-center gap-1 text-muted-foreground hover:text-destructive transition-colors group/btn">
                <div className="p-2 rounded-none group-hover/btn:bg-destructive/5">
                  <Heart className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-bold">45</span>
              </button>
              <button className="flex items-center text-muted-foreground hover:text-primary transition-colors group/btn">
                <div className="p-2 rounded-none group-hover/btn:bg-primary/5">
                  <Bookmark className="h-4 w-4" />
                </div>
              </button>
              {/* <button className="flex items-center text-muted-foreground hover:text-primary transition-colors group/btn">
                <div className="p-2 rounded-none group-hover/btn:bg-primary/5">
                  <Share className="h-4 w-4" />
                </div>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
