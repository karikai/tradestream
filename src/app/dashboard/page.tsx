
import { SidebarNavigation } from "@/components/SidebarNavigation";
import { Feed } from "@/components/Feed";
import { RightSidebar } from "@/components/RightSidebar";
import { MobileNav } from "@/components/MobileNav";
import { AuthGuard } from "@/components/AuthGuard";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="flex w-full max-w-7xl">
        {/* Left Sidebar - Navigation (Hidden on mobile) */}
        <div className="hidden sm:block w-16 lg:w-72 xl:w-80 shrink-0">
          <SidebarNavigation />
        </div>

        {/* Main Center - Feed */}
        <main className="flex-1 min-w-0 max-w-2xl sm:border-x border-border">
          <Feed />
        </main>

        {/* Right Sidebar - Tools & Trends (Hidden on mobile and tablet) */}
        <div className="hidden lg:block w-80 lg:w-96 shrink-0">
          <RightSidebar />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
