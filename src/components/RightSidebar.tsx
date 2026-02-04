
"use client";

import { Search, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SentimentTool } from "./SentimentTool";

const TRENDING_TICKERS = [
  { ticker: "NVDA", activity: "High", trades: 1250 },
  { ticker: "TSLA", activity: "Very High", trades: 3120 },
  { ticker: "PLTR", activity: "Surging", trades: 890 },
  { ticker: "SPY", activity: "Steady", trades: 15400 },
];

export function RightSidebar() {
  return (
    <div className="h-full space-y-4 p-4 sticky top-0 bg-background border-l border-border lg:max-w-xs xl:max-w-sm w-full hidden md:block">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input 
          placeholder="Search tickers or traders" 
          className="pl-10 rounded-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary h-11"
        />
      </div>

      <SentimentTool />

      <Card className="rounded-2xl border-none bg-muted/30 shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-headline font-bold">Market Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {TRENDING_TICKERS.map((item) => (
            <div key={item.ticker} className="flex items-center justify-between group cursor-pointer">
              <div>
                <p className="text-sm font-black text-primary hover:underline">${item.ticker}</p>
                <p className="text-xs text-muted-foreground">{item.trades.toLocaleString()} trades</p>
              </div>
              <Badge variant="outline" className="text-[10px] font-bold border-muted-foreground/20 text-muted-foreground group-hover:bg-primary group-hover:text-white transition-colors">
                {item.activity}
              </Badge>
            </div>
          ))}
          <button className="text-primary text-sm hover:underline font-medium pt-2">Show more</button>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-none bg-muted/30 shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-headline font-bold">Suggested Traders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-200" />
            <div className="flex-1">
              <p className="text-sm font-bold">FlowMaster</p>
              <p className="text-xs text-muted-foreground">@flow_m</p>
            </div>
            <button className="bg-foreground text-background text-xs font-bold px-4 py-2 rounded-full hover:bg-foreground/80 transition-colors">Follow</button>
          </div>
          <button className="text-primary text-sm hover:underline font-medium pt-2">Show more</button>
        </CardContent>
      </Card>

      <div className="px-4 text-[11px] text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
        <span className="hover:underline cursor-pointer">Terms of Service</span>
        <span className="hover:underline cursor-pointer">Privacy Policy</span>
        <span className="hover:underline cursor-pointer">Cookie Policy</span>
        <span className="hover:underline cursor-pointer">Accessibility</span>
        <span className="hover:underline cursor-pointer">Ads info</span>
        <span>© 2025 TradeStream Inc.</span>
      </div>
    </div>
  );
}
