
"use client";

import { SidebarNavigation } from "@/components/SidebarNavigation";
import { RightSidebar } from "@/components/RightSidebar";
import { MobileNav } from "@/components/MobileNav";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Repeat2, UserPlus, Zap } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
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
            <h1 className="text-xl font-black font-headline tracking-tighter">Notifications</h1>
          </div>

          <div className="divide-y divide-border">
            {MOCK_NOTIFICATIONS.length > 0 ? (
              MOCK_NOTIFICATIONS.map((notification) => (
                <div 
                  key={notification.id} 
                  className={cn(
                    "p-4 flex gap-4 transition-colors cursor-pointer hover:bg-muted/30",
                    !notification.read && "bg-primary/5"
                  )}
                >
                  <div className="shrink-0 pt-1">
                    {notification.type === 'like' && <Heart className="h-6 w-6 text-destructive fill-destructive" />}
                    {notification.type === 'repost' && <Repeat2 className="h-6 w-6 text-accent" />}
                    {notification.type === 'follow' && <UserPlus className="h-6 w-6 text-primary" />}
                    {notification.type === 'system' && <Zap className="h-6 w-6 text-primary fill-primary" />}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {notification.user && (
                      <Link href={`/dashboard/profile/${notification.user.handle}`}>
                        <Avatar className="h-8 w-8 mb-2">
                          <AvatarImage src={notification.user.avatar} />
                          <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Link>
                    )}
                    
                    <div>
                      <span className="text-sm">
                        {notification.user ? (
                          <>
                            <Link href={`/dashboard/profile/${notification.user.handle}`} className="font-bold hover:underline">
                              {notification.user.name}
                            </Link>{" "}
                            {notification.message}
                          </>
                        ) : (
                          <span className="font-medium text-primary">TradeStream: </span>
                        )}
                        {!notification.user && notification.message}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.timestamp))} ago
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-muted-foreground">
                No notifications yet.
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
