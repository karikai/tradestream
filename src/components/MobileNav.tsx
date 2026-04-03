
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Mail, Plus, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { PostTradeDialog } from "./PostTradeDialog";
import { useAppData } from '@/context/app-data-context'

export function MobileNav() {
  const { userData } = useAppData();
  const pathname = usePathname();

  const NAV_ITEMS = [
    { icon: Home, label: "Home", href: "/dashboard" },
    // { icon: Users, label: "Groups", href: "/dashboard/groups" },
    // { icon: Mail, label: "Messages", href: "/dashboard/messages" },
    { icon: Search, label: "Search", href: "/dashboard/search" },
    { icon: User, label: "Profile", href: `/dashboard/profile/${userData?.username}` },
  ];

  return (
    <>
      {/* Floating Action Button for Mobile */}
      {/* <div className="sm:hidden fixed bottom-20 right-4 z-50">
        <PostTradeDialog 
          trigger={
            <button className="h-14 w-14 rounded-full bg-primary text-white shadow-lg shadow-primary/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
              <Plus className="h-6 w-6 stroke-[3px]" />
            </button>
          }
        />
      </div> */}

      {/* Bottom Nav Bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-lg border-t border-border flex items-center justify-around px-2 z-50">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 min-w-[60px] transition-colors",
              pathname === item.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className={cn("h-5 w-5", pathname === item.href && "fill-primary/10")} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
