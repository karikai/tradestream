
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bell, Mail, Bookmark, User, Settings, Zap, TrendingUp, MoreHorizontal, Users, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PostTradeDialog } from "./PostTradeDialog";

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Users, label: "Groups", href: "/groups" },
  { icon: User, label: "Profile", href: "/profile/johndoe_trading" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function SidebarNavigation() {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col justify-between p-4 bg-background border-r border-border sticky top-0">
      <div className="space-y-6">
        <Link href="/" className="flex items-center gap-2 px-2 text-primary">
          <div className="p-2 rounded-xl bg-primary text-white">
            <Zap className="h-6 w-6 fill-white" />
          </div>
          <span className="text-xl font-black font-headline tracking-tighter">TradeStream</span>
        </Link>
        
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-full text-lg font-medium transition-colors hover:bg-muted group",
                pathname === item.href ? "font-bold text-foreground" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-6 w-6", pathname === item.href && "text-primary")} />
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          ))}
        </nav>

        <PostTradeDialog 
          trigger={
            <Button className="w-full rounded-full py-6 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              <span className="hidden lg:inline">Post Trade</span>
              <Plus className="h-5 w-5 lg:hidden" />
            </Button>
          }
        />
      </div>

      <div className="mt-auto pb-4">
        <Link href="/profile/johndoe_trading" className="flex items-center gap-3 p-3 w-full rounded-full hover:bg-muted transition-colors text-left">
          <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
            JD
          </div>
          <div className="hidden lg:block">
            <p className="font-bold text-sm">John Doe</p>
            <p className="text-muted-foreground text-xs text-nowrap overflow-hidden text-ellipsis">@johndoe_trading</p>
          </div>
          <MoreHorizontal className="h-4 w-4 ml-auto text-muted-foreground hidden lg:block" />
        </Link>
      </div>
    </div>
  );
}
