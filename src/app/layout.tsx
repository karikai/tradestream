
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { PWAProvider } from '@/components/PWAProvider';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { AppDataProvider } from '@/context/app-data-context';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'TradeStream | Live Options Trade Feed',
  description: 'Real-time stock options trades for serious investors.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TradeStream',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="font-body antialiased selection:bg-accent/30 selection:text-foreground">
        <FirebaseClientProvider>
          <AppDataProvider>
            <PWAProvider>
              {children}
              <Toaster />
            </PWAProvider>
          </AppDataProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
