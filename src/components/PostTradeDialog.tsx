
"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  ChevronRight, 
  ArrowLeft, 
  Zap, 
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { addDays, format, addWeeks, addMonths } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface PostTradeDialogProps {
  trigger?: React.ReactNode;
}

type Step = "ticker" | "expiration" | "strike" | "details";

export function PostTradeDialog({ trigger }: PostTradeDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("ticker");
  
  // Form State
  const [ticker, setTicker] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [optionType, setOptionType] = useState<"call" | "put">("call");
  const [strikePrice, setStrikePrice] = useState<number | null>(null);
  const [contracts, setContracts] = useState("");
  const [avgCost, setAvgCost] = useState("");

  // Mock Data Generators
  const mockExpirations = useMemo(() => {
    const today = new Date();
    return [
      format(addDays(today, 3), "yyyy-MM-dd"),
      format(addWeeks(today, 1), "yyyy-MM-dd"),
      format(addWeeks(today, 2), "yyyy-MM-dd"),
      format(addMonths(today, 1), "yyyy-MM-dd"),
      format(addMonths(today, 2), "yyyy-MM-dd"),
    ];
  }, []);

  const mockStrikes = useMemo(() => {
    const basePrice = 150; // Generic base price
    return Array.from({ length: 15 }, (_, i) => basePrice - 10 + i * 2.5);
  }, []);

  const resetForm = () => {
    setStep("ticker");
    setTicker("");
    setExpirationDate("");
    setOptionType("call");
    setStrikePrice(null);
    setContracts("");
    setAvgCost("");
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) resetForm();
  };

  const handlePostTrade = () => {
    toast({
      title: "Trade Posted!",
      description: `${ticker} ${format(new Date(expirationDate), "MMM d")} $${strikePrice} ${optionType.toUpperCase()} has been shared to your feed.`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="rounded-full bg-primary hover:bg-primary/90 text-white">
            <Plus className="h-5 w-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-none bg-white rounded-3xl h-[600px] flex flex-col">
        {/* Header with Navigation */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {step !== "ticker" && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8"
                onClick={() => {
                  if (step === "expiration") setStep("ticker");
                  if (step === "strike") setStep("expiration");
                  if (step === "details") setStep("strike");
                }}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle className="text-xl font-black font-headline tracking-tighter">
              {step === "ticker" && "Search Ticker"}
              {step === "expiration" && `$${ticker} Expiration`}
              {step === "strike" && `${format(new Date(expirationDate), "MMM d, yyyy")}`}
              {step === "details" && "Trade Details"}
            </DialogTitle>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* STEP 1: TICKER SEARCH */}
          {step === "ticker" && (
            <div className="p-6 space-y-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  autoFocus
                  placeholder="Symbol (e.g. NVDA)"
                  className="pl-11 rounded-2xl bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary h-14 text-lg font-bold uppercase tracking-widest"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && ticker) setStep("expiration");
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Trending</p>
                <div className="flex flex-wrap gap-2">
                  {["SPY", "QQQ", "TSLA", "NVDA", "AAPL", "BTC"].map((sym) => (
                    <Button 
                      key={sym} 
                      variant="outline" 
                      className="rounded-full font-bold h-9 bg-muted/20 border-none hover:bg-primary hover:text-white transition-all"
                      onClick={() => {
                        setTicker(sym);
                        setStep("expiration");
                      }}
                    >
                      ${sym}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EXPIRATION DATE */}
          {step === "expiration" && (
            <ScrollArea className="flex-1">
              <div className="divide-y divide-border">
                {mockExpirations.map((date) => (
                  <button
                    key={date}
                    className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors text-left group"
                    onClick={() => {
                      setExpirationDate(date);
                      setStep("strike");
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{format(new Date(date), "MMMM d, yyyy")}</p>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Standard Expiration</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </ScrollArea>
          )}

          {/* STEP 3: STRIKE PRICE & TYPE */}
          {step === "strike" && (
            <>
              <div className="px-4 py-2 border-b border-border bg-gray-50/50">
                <Tabs defaultValue="call" className="w-full" onValueChange={(v) => setOptionType(v as any)}>
                  <TabsList className="w-full h-11 grid grid-cols-2 rounded-2xl bg-muted/50 p-1">
                    <TabsTrigger value="call" className="rounded-xl font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Calls</TabsTrigger>
                    <TabsTrigger value="put" className="rounded-xl font-bold data-[state=active]:bg-destructive data-[state=active]:text-white">Puts</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <ScrollArea className="flex-1">
                <div className="divide-y divide-border">
                  <div className="grid grid-cols-3 px-6 py-2 bg-muted/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground sticky top-0 z-10 backdrop-blur-sm">
                    <span>Strike</span>
                    <span className="text-center">Bid</span>
                    <span className="text-right">Ask</span>
                  </div>
                  {mockStrikes.map((strike) => (
                    <button
                      key={strike}
                      className="w-full grid grid-cols-3 items-center px-6 py-4 hover:bg-muted/30 transition-colors text-left"
                      onClick={() => {
                        setStrikePrice(strike);
                        setStep("details");
                      }}
                    >
                      <span className="font-black text-primary">${strike.toFixed(1)}</span>
                      <span className="text-center text-sm font-medium tabular-nums">{(Math.random() * 5).toFixed(2)}</span>
                      <span className="text-right text-sm font-medium tabular-nums">{(Math.random() * 5 + 0.5).toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </>
          )}

          {/* STEP 4: QUANTITY & COST */}
          {step === "details" && (
            <div className="p-6 space-y-8">
              <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary fill-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Preview</span>
                </div>
                <h3 className="text-2xl font-black font-headline tracking-tighter">
                  ${ticker} {strikePrice} {optionType.toUpperCase()}
                </h3>
                <p className="text-sm font-bold text-muted-foreground">Exp. {format(new Date(expirationDate), "MMM d, yyyy")}</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Contracts</Label>
                    <div className="relative">
                      <Zap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        placeholder="0"
                        className="pl-10 rounded-2xl h-14 font-black text-xl"
                        value={contracts}
                        onChange={(e) => setContracts(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Avg Cost</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        placeholder="0.00"
                        className="pl-10 rounded-2xl h-14 font-black text-xl"
                        value={avgCost}
                        onChange={(e) => setAvgCost(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <div className="flex items-center justify-between text-sm px-1">
                    <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Estimated In</span>
                    <span className="font-black text-primary">
                      ${(Number(contracts || 0) * Number(avgCost || 0) * 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <Button 
                    className="w-full h-16 rounded-3xl font-black text-xl bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                    onClick={handlePostTrade}
                    disabled={!contracts || !avgCost}
                  >
                    POST TRADE
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
