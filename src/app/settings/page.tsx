
"use client";

import { useState } from "react";
import { SidebarNavigation } from "@/components/SidebarNavigation";
import { RightSidebar } from "@/components/RightSidebar";
import { MobileNav } from "@/components/MobileNav";
import { useUser, useAuth } from "@/firebase";
import { updateProfile, updateEmail, sendPasswordResetEmail } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { KeyRound, User, Mail, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  const { user } = useUser();
  const auth = useAuth();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  const handleUpdateProfile = async () => {
    if (!auth.currentUser) return;
    setIsUpdatingProfile(true);
    try {
      await updateProfile(auth.currentUser, { displayName });
      toast({
        title: "Profile updated",
        description: "Your display name has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message,
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!auth.currentUser) return;
    setIsUpdatingEmail(true);
    try {
      // Note: Firebase updateEmail requires a recent login
      await updateEmail(auth.currentUser, email);
      toast({
        title: "Email updated",
        description: "Your email address has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "Email updates may require a recent login for security.",
      });
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast({
        title: "Reset link sent",
        description: `A password reset link has been sent to ${user.email}`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
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
            {/* Profile Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Public Profile
                </CardTitle>
                <CardDescription>Update your public-facing information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input 
                    id="displayName" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-6 py-4">
                <Button 
                  onClick={handleUpdateProfile} 
                  disabled={isUpdatingProfile}
                  className="rounded-full font-bold ml-auto"
                >
                  {isUpdatingProfile ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>

            {/* Account Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Account Email
                </CardTitle>
                <CardDescription>Change the email address associated with your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-6 py-4">
                <Button 
                  onClick={handleUpdateEmail} 
                  disabled={isUpdatingEmail}
                  className="rounded-full font-bold ml-auto"
                >
                  {isUpdatingEmail ? "Updating..." : "Update Email"}
                </Button>
              </CardFooter>
            </Card>

            {/* Security Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-primary" />
                  Security
                </CardTitle>
                <CardDescription>Manage your account security and password.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold">Reset Password</p>
                    <p className="text-xs text-muted-foreground">Receive a reset link via email.</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handlePasswordReset} className="rounded-full font-bold">
                    Send Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-widest text-primary">Verification</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Verified badges are currently issued to high-volume traders. 
                  Reach out to support if you'd like to apply for a verified checkmark.
                </p>
              </div>
            </div>
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
