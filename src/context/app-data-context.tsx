'use client';
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useFirestore, useUser } from '@/firebase';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface UserData {
  uid: string;
  email: string;
  name: string;
  username: string;
  dateCreated: string;
}

interface AppDataContextValue {
  isLoaded: boolean;
  isAuthenticated: boolean;
  user: User | null;
  userData: UserData | null;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const isAuthenticated = !isUserLoading && !!user;

  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setUserData(null);
      setIsLoaded(true);
      return;
    }

    // Reset loading state when user changes
    setIsLoaded(false);

    getDoc(doc(firestore, `users/${user!.uid}`))
      .then((userDoc) => {
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        } else {
          setUserData(null);
        }
      })
      .finally(() => setIsLoaded(true));

  }, [firestore, user, isAuthenticated]);

  return (
    <AppDataContext.Provider value={{
      user,
      userData,
      isAuthenticated,
      isLoaded
    }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) throw new Error('useAppData must be used within AppDataProvider');
  return context;
}
