
"use client";

import { useState } from "react";
import { SidebarNavigation } from "@/components/SidebarNavigation";
import { RightSidebar } from "@/components/RightSidebar";
import { MobileNav } from "@/components/MobileNav";
import { MOCK_USERS } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Verified, UserPlus } from "lucide-react";
import Link from "next/link";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = MOCK_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="flex w-full max-w-7xl">
        {/* Left Sidebar */}
        <div className="hidden sm:block w-16 lg:w-72 xl:w-80 shrink-0">
          <SidebarNavigation />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-2xl sm:border-x border-border bg-white min-h-screen">
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border p-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search traders..."
                className="pl-11 rounded-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary h-11 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="divide-y divide-border">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-4 flex items-start gap-3 hover:bg-muted/30 transition-colors group cursor-pointer"
                >
                  <Link href={`/profile/${user.handle}`} className="shrink-0">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <Link href={`/profile/${user.handle}`} className="min-w-0">
                        <div className="flex items-center gap-0.5">
                          <span className="font-bold text-sm truncate hover:underline">
                            {user.name}
                          </span>
                          {user.verified && (
                            <Verified className="h-3.5 w-3.5 text-primary fill-primary text-primary-foreground shrink-0" />
                          )}
                        </div>
                        <p className="text-muted-foreground text-xs">@{user.handle}</p>
                      </Link>
                      <Button
                        size="sm"
                        className="rounded-full font-bold bg-foreground text-background hover:bg-foreground/90 h-8 px-4"
                      >
                        Follow
                      </Button>
                    </div>
                    {user.bio && (
                      <p className="text-sm mt-1 line-clamp-2 text-foreground/80 leading-snug">
                        {user.bio}
                      </p>
                    )}
                    <div className="flex gap-3 mt-2 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                      <span>{user.followers?.toLocaleString()} Followers</span>
                      <span>{user.following?.toLocaleString()} Following</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-muted-foreground">
                <p>No traders found matching "{searchQuery}"</p>
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
