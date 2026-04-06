"use client";

import { SidebarNavigation } from "@/components/SidebarNavigation";
import { RightSidebar } from "@/components/RightSidebar";
import { MobileNav } from "@/components/MobileNav";
import { MOCK_GROUPS, MOCK_MEMBERSHIPS } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Lock, ChevronRight, Verified, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GroupsPage() {
  const currentUserId = 'u4';
  const myMemberships = MOCK_MEMBERSHIPS.filter(m => m.userId === currentUserId);
  const myGroups = MOCK_GROUPS.filter(g => myMemberships.some(m => m.groupId === g.id));
  const suggestedGroups = MOCK_GROUPS.filter(g => !myMemberships.some(m => m.groupId === g.id));

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="flex w-full max-w-7xl">
        {/* Left Sidebar */}
        <div className="hidden sm:block w-16 lg:w-72 xl:w-80 shrink-0">
          <SidebarNavigation />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-2xl sm:border-x border-border bg-white min-h-screen">
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border p-4 flex items-center justify-between">
            <h1 className="text-xl font-black font-headline tracking-tighter">Groups</h1>
            <Button variant="outline" size="sm" className="rounded-full font-bold gap-2 hover:bg-primary/5 hover:text-primary border-primary/20 transition-colors">
              <Sparkles className="h-4 w-4 text-primary" />
              Create Group
            </Button>
          </div>

          <div className="p-4 space-y-8">
            {/* My Subscriptions */}
            <section className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                My Subscriptions
              </h2>
              {myGroups.length > 0 ? (
                <div className="grid gap-4">
                  {myGroups.map((group) => (
                    <Link key={group.id} href={`/dashboard/groups/${group.id}`}>
                      <Card className="overflow-hidden border-primary/10 hover:border-primary/30 transition-colors group cursor-pointer">
                        <CardContent className="p-0">
                          <div className="p-4 flex gap-4">
                            <Avatar className="h-16 w-16 rounded-2xl">
                              <AvatarImage src={group.avatar} />
                              <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="min-w-0">
                                  <h3 className="font-bold truncate flex items-center gap-1">
                                    {group.name}
                                  </h3>
                                  <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                                    by <span className="font-bold text-primary">@{group.creator.username}</span>
                                    {group.creator.verified && <Verified className="h-3.5 w-3.5 text-primary fill-primary text-primary-foreground" />}
                                  </p>
                                </div>
                                <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold">SUBSCRIBED</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {group.description}
                              </p>
                              <div className="flex items-center gap-4 mt-3">
                                <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {group.memberCount.toLocaleString()} members
                                </span>
                                <Button variant="link" className="p-0 h-auto text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                                  View Group <ChevronRight className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-muted/20 rounded-2xl border border-dashed">
                  <p className="text-sm text-muted-foreground">You haven't joined any groups yet.</p>
                </div>
              )}
            </section>

            {/* Suggested Groups */}
            <section className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Discover Groups
              </h2>
              <div className="grid gap-4">
                {suggestedGroups.map((group) => (
                  <Card key={group.id} className="overflow-hidden hover:bg-muted/30 transition-colors">
                    <CardContent className="p-4 flex items-center gap-4">
                      <Avatar className="h-14 w-14 rounded-xl">
                        <AvatarImage src={group.avatar} />
                        <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate">{group.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">@{group.creator.username}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-[10px] font-black border-primary/20 text-primary">
                            ${group.monthlyPrice}/mo
                          </Badge>
                          <span className="text-[10px] font-bold text-muted-foreground">
                            {group.memberCount.toLocaleString()} members
                          </span>
                        </div>
                      </div>
                      <Button className="rounded-full font-bold h-9 bg-foreground text-background hover:bg-foreground/90 gap-2">
                        <Lock className="h-3.5 w-3.5" />
                        Join
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
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
