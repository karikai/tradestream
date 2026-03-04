
"use client";

import { useState } from "react";
import { SidebarNavigation } from "@/components/SidebarNavigation";
import { RightSidebar } from "@/components/RightSidebar";
import { MobileNav } from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, MapPin, Globe, AtSign, AlignLeft } from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { useAppData } from "@/context/app-data-context";

export default function SettingsPage() {
  const appData = useAppData()
  const firestore = useFirestore();
  const { toast } = useToast();

  // Local state for form fields
  const [formData, setFormData] = useState({
    displayName: appData.userData?.name,
    username: appData.userData?.username,
    // location: "Financial District, NY",
    // bio: "Professional coffee drinker and part-time index trader.",
    // websiteUrl: "https://tradestream.io",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);

    setDoc(doc(firestore,`users/${appData.userData?.uid}`), {
      'displayName': formData.displayName,
      'username': formData.username,
    }, {merge: true})

    toast({
      title: "Settings saved",
      description: "Your profile information has been updated successfully.",
    });

    /* 
    Real logic would go here:
    - Update Firestore user document
    - Update Firebase Auth profile if necessary
    */
  };

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
            <h1 className="text-xl font-black font-headline tracking-tighter">Settings</h1>
          </div>

          <div className="p-4 space-y-6">
            <Card className="border-none shadow-none">
              <CardHeader className="px-0">
                <CardTitle className="text-lg font-black font-headline flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Edit Profile
                </CardTitle>
                <CardDescription>
                  This information will be displayed publicly on your profile page.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                {/* Display Name */}
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">
                    Display Name
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      id="displayName" 
                      value={formData.displayName} 
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="pl-10 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">
                    Username
                  </Label>
                  <div className="relative group">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      id="username" 
                      value={formData.username} 
                      onChange={handleInputChange}
                      placeholder="username"
                      className="pl-10 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                </div>

                {/* Location */}
                {/* <div className="space-y-2">
                  <Label htmlFor="location" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">
                    Location
                  </Label>
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      id="location" 
                      value={formData.location} 
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className="pl-10 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                </div> */}

                {/* Website URL */}
                {/* <div className="space-y-2">
                  <Label htmlFor="websiteUrl" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">
                    Website
                  </Label>
                  <div className="relative group">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      id="websiteUrl" 
                      value={formData.websiteUrl} 
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      className="pl-10 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                </div> */}

                {/* Bio */}
                {/* <div className="space-y-2">
                  <Label htmlFor="bio" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">
                    Bio
                  </Label>
                  <div className="relative group">
                    <AlignLeft className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Textarea 
                      id="bio" 
                      value={formData.bio} 
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself..."
                      className="pl-10 rounded-xl bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary min-h-[100px] resize-none"
                    />
                  </div>
                </div> */}
              </CardContent>
              <CardFooter className="px-0 pt-6">
                <Button 
                  onClick={handleSaveSettings} 
                  disabled={isSaving}
                  className="w-full rounded-full font-bold h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
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
