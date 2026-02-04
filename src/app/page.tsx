
import { SidebarNavigation } from "@/components/SidebarNavigation";
import { Feed } from "@/components/Feed";
import { RightSidebar } from "@/components/RightSidebar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="flex w-full max-w-7xl">
        {/* Left Sidebar - Navigation */}
        <div className="w-16 lg:w-72 xl:w-80 shrink-0">
          <SidebarNavigation />
        </div>

        {/* Main Center - Feed */}
        <main className="flex-1 min-w-0 max-w-2xl">
          <Feed />
        </main>

        {/* Right Sidebar - Tools & Trends */}
        <div className="hidden md:block w-80 lg:w-96 shrink-0">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
