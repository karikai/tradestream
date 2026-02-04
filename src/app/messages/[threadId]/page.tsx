
"use client";

import { use, useState, useEffect } from "react";
import { SidebarNavigation } from "@/SidebarNavigation";
import { RightSidebar } from "@/RightSidebar";
import { MobileNav } from "@/MobileNav";
import { MOCK_MESSAGE_THREADS, MOCK_USERS } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, Send, Verified, Image as ImageIcon, Smile, Paperclip } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Correcting relative imports since this is in a subdirectory
import { SidebarNavigation as DesktopSidebar } from "@/components/SidebarNavigation";
import { RightSidebar as DesktopRightSidebar } from "@/components/RightSidebar";
import { MobileNav as BottomMobileNav } from "@/components/MobileNav";

export default function MessageThreadPage({ params }: { params: Promise<{ threadId: string }> }) {
  const { threadId } = use(params);
  const thread = MOCK_MESSAGE_THREADS.find(t => t.id === threadId);
  const currentUser = MOCK_USERS.find(u => u.id === 'u4'); // Assuming John Doe is the current user

  const [newMessage, setNewMessage] = useState("");

  if (!thread) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Thread not found</h1>
          <Link href="/messages">
            <Button variant="link">Return to messages</Button>
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
          <DesktopSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-2xl sm:border-x border-border bg-white flex flex-col h-screen">
          {/* Sticky Header */}
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-4">
              <Link href="/messages">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={thread.user.avatar} />
                  <AvatarFallback>{thread.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-sm font-black flex items-center gap-0.5">
                    {thread.user.name}
                    {thread.user.verified && <Verified className="h-3.5 w-3.5 text-primary fill-primary text-primary-foreground" />}
                  </h1>
                  <p className="text-[10px] text-muted-foreground">@{thread.user.handle}</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Info className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
            <div className="flex flex-col items-center py-8 space-y-2 border-b border-border mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={thread.user.avatar} />
                <AvatarFallback>{thread.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-black text-lg">{thread.user.name}</p>
                <p className="text-muted-foreground text-sm">@{thread.user.handle}</p>
                <p className="text-xs text-muted-foreground mt-2 max-w-[200px] mx-auto">{thread.user.bio}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Joined {thread.user.joinedDate}</p>
              </div>
            </div>

            {thread.messages.map((msg) => {
              const isMe = msg.senderId === currentUser?.id;
              return (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex flex-col max-w-[80%]",
                    isMe ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "px-4 py-2 rounded-2xl text-sm",
                    isMe 
                      ? "bg-primary text-white rounded-tr-none shadow-sm" 
                      : "bg-white border border-border text-foreground rounded-tl-none shadow-sm"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1">
                    {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-white sticky bottom-0 sm:bottom-0 pb-20 sm:pb-4">
            <div className="flex items-center gap-2 bg-muted/50 rounded-2xl px-4 py-1 border border-transparent focus-within:border-primary/20 focus-within:bg-white transition-all">
              <Button variant="ghost" size="icon" className="rounded-full text-primary shrink-0">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-primary shrink-0 hidden sm:flex">
                <Smile className="h-5 w-5" />
              </Button>
              <Input 
                placeholder="Start a new message" 
                className="border-none bg-transparent focus-visible:ring-0 px-0 h-10"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "rounded-full transition-colors shrink-0",
                  newMessage.trim() ? "text-primary" : "text-muted-foreground"
                )}
                disabled={!newMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80 lg:w-96 shrink-0">
          <DesktopRightSidebar />
        </div>
      </div>

      {/* Mobile Nav */}
      <BottomMobileNav />
    </div>
  );
}
