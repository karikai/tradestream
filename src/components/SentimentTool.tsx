
"use client";

import { useState } from "react";
import { analyzeTradeSentiment, AnalyzeTradeSentimentOutput } from "@/ai/flows/analyze-trade-sentiment";
import { MOCK_TRADES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Loader2, Sparkles, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function SentimentTool() {
  const [ticker, setTicker] = useState("");
  const [analysis, setAnalysis] = useState<AnalyzeTradeSentimentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!ticker) return;
    setIsLoading(true);
    try {
      // Filter mock trades for this ticker to pass to AI
      const tradesForTicker = MOCK_TRADES
        .filter(t => t.ticker.toUpperCase() === ticker.toUpperCase())
        .map(t => ({
          contracts: t.contractsPurchased,
          avgCost: t.averageCost,
          optionType: t.optionType
        }));

      // If no trades found, we still call it with the ticker to see AI's general take
      const result = await analyzeTradeSentiment({
        ticker: ticker.toUpperCase(),
        trades: tradesForTicker.length > 0 ? tradesForTicker : [
            { contracts: 100, avgCost: 5.50, optionType: 'call' },
            { contracts: 200, avgCost: 4.20, optionType: 'put' }
        ]
      });
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return <TrendingUp className="h-5 w-5 text-accent" />;
      case 'bearish': return <TrendingDown className="h-5 w-5 text-destructive" />;
      default: return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return "text-accent border-accent/20 bg-accent/5";
      case 'bearish': return "text-destructive border-destructive/20 bg-destructive/5";
      default: return "text-muted-foreground border-muted/20 bg-muted/5";
    }
  };

  return (
    <Card className="border-primary/20 bg-white/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-3 space-y-1">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-headline">AI Sentiment Analyst</CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 ml-auto text-[10px] h-5">SUBSCRIBER PRO</Badge>
        </div>
        <CardDescription>Analyze real-time order flow for any ticker</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Enter Ticker (e.g. AAPL)" 
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            className="uppercase font-bold tracking-widest"
          />
          <Button onClick={handleAnalyze} disabled={isLoading || !ticker} className="shrink-0 bg-primary hover:bg-primary/90">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          </Button>
        </div>

        {analysis && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className={cn("flex items-center justify-between p-3 rounded-lg border", getSentimentColor(analysis.sentiment))}>
              <div className="flex items-center gap-2">
                {getSentimentIcon(analysis.sentiment)}
                <span className="font-bold uppercase tracking-widest text-sm">{analysis.sentiment}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-medium block opacity-70">Confidence</span>
                <span className="font-bold text-sm">{(analysis.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed italic">
              "{analysis.reasoning}"
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
