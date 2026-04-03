"use client";

import { use, useEffect, useState } from "react";
import { SidebarNavigation } from "@/components/SidebarNavigation";
import { RightSidebar } from "@/components/RightSidebar";
import { MobileNav } from "@/components/MobileNav";
import { MOCK_USERS, MOCK_TRADES, MOCK_GROUPS } from "@/lib/mock-data";
import { TradeCard } from "@/components/TradeCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Link as LinkIcon, MapPin, ArrowLeft, Verified, Lock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { Trade, User } from "@/lib/types";
import { useAppData } from "@/context/app-data-context";
import { UserData } from "@/models/user";

export default function ProfilePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = use(params);
  const firestore = useFirestore();
  const appData = useAppData()
  const [user, setUser] = useState<UserData | null>(null);
  const [userTrades, setUserTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [followingTotal, setFollowingTotal] = useState(0);
  const [followersTotal, setFollowersTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Fetch user
        let userData = null;
        const usersRef = collection(firestore, "users");
        const usersQuery = query(usersRef, where("username", "==", handle));
        const usersSnapshot = await getDocs(usersQuery);

        if (!usersSnapshot.empty) {
          userData = UserData.fromSnapshot(usersSnapshot.docs[0]);
          setUser(userData);
        } else {
          setUser(null);
        }

        // 🔹 Fetch trades
        const tradesRef = collection(firestore, "trades");
        const tradesQuery = query(tradesRef, where("user", "==", userData?.uid));
        const tradesSnapshot = await getDocs(tradesQuery);

        const trades: Trade[] = tradesSnapshot.docs.map(
          (doc) => doc.data() as Trade
        );

        trades.forEach((trade) => {
          //@ts-ignore
          trade.user = userData
        })

        setUserTrades(trades);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [handle, firestore]);

  const group = MOCK_GROUPS.find(g => g.creator.handle.toLowerCase() === handle.toLowerCase());
  const isMe = handle.toLowerCase() === appData.userData?.username

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">User not found</h1>
          <Link href="/">
            <Button variant="link">Return home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="flex w-full max-w-7xl">
        {/* Left Sidebar */}
        <div className="hidden sm:block w-16 lg:w-72 xl:w-80 shrink-0">
          <SidebarNavigation />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-2xl sm:border-x border-border bg-white">
          {/* Header */}
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border flex items-center gap-6 px-4 py-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-black font-headline tracking-tighter flex items-center gap-1">
                {user.name}
                {user.verified && <Verified className="h-4 w-4 text-primary fill-primary text-primary-foreground" />}
              </h1>
              <p className="text-xs text-muted-foreground">{userTrades.length} trades</p>
            </div>
          </div>

          {/* Banner & Avatar */}
          <div className="relative">
            <div className="h-32 sm:h-48 bg-muted" />
            <div className="absolute -bottom-16 left-4 border-4 border-white rounded-full">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                {/* <AvatarImage src={user.avatar} /> */}
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex justify-end p-4 gap-2">
              {isMe ? (
                <Button variant="outline" className="rounded-full font-bold hover:bg-muted/30 transition-colors">
                  <Link href={'/dashboard/settings'}>
                    Edit profile
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="rounded-full font-bold hover:bg-muted/30 transition-colors">Follow</Button>
                  {group && (
                    <Link href={`/dashboard/checkout/${group.id}`}>
                      <Button className="rounded-full font-bold bg-primary hover:bg-primary/90 gap-2">
                        <Lock className="h-4 w-4" />
                        Join Group
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="mt-16 px-4 space-y-4 pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-black font-headline tracking-tighter flex items-center gap-1">
                {user.name}
                {user.verified && <Verified className="h-4 w-4 text-primary fill-primary text-primary-foreground" />}
              </h2>
              <p className="text-muted-foreground text-sm">@{user.username}</p>
            </div>

            {user.bio && <p className="text-sm leading-relaxed">{user.bio}</p>}

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                <span className="text-primary hover:underline cursor-pointer">{user.website}</span>
              </div>
              <br/>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>Joined {user.dateCreated ? format(new Date(user.dateCreated), "MMMM yyyy") : ""}</span>
              </div>
            </div>

            <div className="flex gap-4 text-sm">
              <div className="flex gap-1">
                <span className="font-bold">{(followingTotal || 0).toLocaleString()}</span>
                <span className="text-muted-foreground">Following</span>
              </div>
              <div className="flex gap-1">
                <span className="font-bold">{(followersTotal || 0).toLocaleString()}</span>
                <span className="text-muted-foreground">Followers</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="trades" className="w-full">
            <TabsList className="w-full h-12 bg-transparent rounded-none p-0 border-b border-border">
              <TabsTrigger 
                value="trades" 
                className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:shadow-none font-bold text-muted-foreground data-[state=active]:text-foreground"
              >
                Trades
              </TabsTrigger>
              <TabsTrigger 
                value="replies" 
                className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:shadow-none font-bold text-muted-foreground data-[state=active]:text-foreground"
              >
                Replies
              </TabsTrigger>
              <TabsTrigger 
                value="likes" 
                className="flex-1 h-full rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:shadow-none font-bold text-muted-foreground data-[state=active]:text-foreground"
              >
                Likes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="trades" className="m-0 divide-y divide-border">
              {userTrades.length > 0 ? (
                userTrades.map((trade) => (
                  <TradeCard key={trade.id} trade={trade} />
                ))
              ) : (
                <div className="p-12 text-center text-muted-foreground">
                  No trades posted yet.
                </div>
              )}
            </TabsContent>
            <TabsContent value="replies" className="m-0 p-12 text-center text-muted-foreground">
              No replies found.
            </TabsContent>
            <TabsContent value="likes" className="m-0 p-12 text-center text-muted-foreground">
              No liked trades found.
            </TabsContent>
          </Tabs>
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
