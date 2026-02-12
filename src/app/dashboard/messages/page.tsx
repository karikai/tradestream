
"use client";

import { SidebarNavigation } from "@/components/SidebarNavigation";
import { RightSidebar } from "@/components/RightSidebar";
import { MobileNav } from "@/components/MobileNav";
import { MOCK_MESSAGE_THREADS } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Search, Verified } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="flex w-full max-w-7xl">
        {/* Left Sidebar */}
        <div className="hidden sm:block w-16 lg:w-72 xl:w-80 shrink-0">
          <SidebarNavigation />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-2xl sm:border-x border-border bg-white">
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 py-4">
            <h1 className="text-xl font-black font-headline tracking-tighter">Messages</h1>
          </div>

          <div className="p-4 border-b border-border">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search Direct Messages" 
                className="pl-10 rounded-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary h-11"
              />
            </div>
          </div>

          <div className="divide-y divide-border">
            {MOCK_MESSAGE_THREADS.length > 0 ? (
              MOCK_MESSAGE_THREADS.map((thread) => (
                <Link 
                  key={thread.id} 
                  href={`/dashboard/messages/${thread.id}`}
                  className={cn(
                    "p-4 flex gap-4 transition-colors cursor-pointer hover:bg-muted/30 border-l-4 block",
                    thread.unread ? "border-primary bg-primary/5" : "border-transparent"
                  )}
                >
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage src={thread.user.avatar} />
                    <AvatarFallback>{thread.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="font-bold text-sm truncate">{thread.user.name}</span>
                        {thread.user.verified && <Verified className="h-3.5 w-3.5 text-primary fill-primary text-primary-foreground" />}
                        <span className="text-muted-foreground text-xs truncate">@{thread.user.handle}</span>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(thread.timestamp), { addSuffix: false })}
                      </span>
                    </div>
                    <p className={cn(
                      "text-sm line-clamp-1",
                      thread.unread ? "font-bold text-foreground" : "text-muted-foreground"
                    )}>
                      {thread.lastMessage}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-12 text-center text-muted-foreground">
                No messages yet. Start a conversation with a trader!
              </div>
            )}
          </div>
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
