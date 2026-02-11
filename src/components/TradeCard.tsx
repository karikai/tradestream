
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
            <div className="flex flex-wrap items-center gap-2 mb-2">
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
              {trade.profitPercentage && trade.profitPercentage > 0 && (
                <Badge variant="outline" className="ml-auto border-accent/20 bg-accent/5 text-accent font-black gap-1 text-[10px]">
                  <Flame className="h-3 w-3 fill-accent" />
                  +{trade.profitPercentage}%
                </Badge>
              )}
            </div>
            
            <div className="space-y-0">
              <div className="grid grid-cols-2 gap-3 bg-muted/20 p-3 rounded-t-lg border border-border/50">
                <div>
                  <p className="text-[9px] uppercase text-muted-foreground font-black tracking-wider">Avg Cost</p>
                  <p className="text-sm font-bold tabular-nums">${trade.averageCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase text-muted-foreground font-black tracking-wider">Contracts</p>
                  <p className="text-sm font-bold tabular-nums">{trade.contractsPurchased.toLocaleString()}</p>
                </div>
              </div>

              {(trade.contractsSold !== undefined || trade.profitAmount !== undefined) && (
                <div className="grid grid-cols-2 gap-3 bg-primary/5 p-3 rounded-b-lg border border-primary/10 border-t-0">
                  {trade.contractsSold !== undefined && (
                    <div>
                      <p className="text-[9px] uppercase text-primary/70 font-black tracking-wider">Sold @ ${trade.priceAtClose?.toFixed(2)}</p>
                      <p className="text-sm font-bold tabular-nums">{trade.contractsSold} Closed</p>
                    </div>
                  )}
                  {trade.profitAmount !== undefined && (
                    <div>
                      <p className="text-[9px] uppercase text-primary/70 font-black tracking-wider">Total Profit</p>
                      <div className="flex items-center gap-1">
                        <p className={cn("text-sm font-black tabular-nums", isProfitable ? "text-accent" : "text-destructive")}>
                          {isProfitable ? '+' : ''}${trade.profitAmount.toLocaleString()}
                        </p>
                        {isProfitable ? (
                          <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
                        ) : (
                          <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
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
