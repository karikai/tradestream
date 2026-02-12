'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

/**
 * Hook for programmatic auth checking and redirects.
 * Useful when you need auth logic in a component without wrapping it in AuthGuard.
 * 
 * @param redirectTo - Path to redirect to if not authenticated (default: '/login')
 * @returns Object with user, isUserLoading, userError, and isAuthenticated
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, isAuthenticated, isUserLoading } = useAuthGuard();
 *   
 *   if (isUserLoading) return <div>Loading...</div>;
 *   if (!isAuthenticated) return null; // Will redirect
 *   
 *   return <div>Welcome {user?.email}</div>;
 * }
 * ```
 */
export function useAuthGuard(redirectTo: string = '/login') {
  const { user, isUserLoading, userError } = useUser();
  const router = useRouter();
  const isAuthenticated = !isUserLoading && !!user;

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push(redirectTo);
    }
  }, [user, isUserLoading, router, redirectTo]);

  return {
    user,
    isUserLoading,
    userError,
    isAuthenticated,
  };
}

/**
 * Hook to check if user is authenticated without redirecting.
 * Useful for conditional rendering based on auth state.
 * 
 * @returns Object with user, isUserLoading, userError, and isAuthenticated
 * 
 * @example
 * ```tsx
 * function Header() {
 *   const { isAuthenticated, user } = useAuthCheck();
 *   
 *   return (
 *     <header>
 *       {isAuthenticated ? (
 *         <span>Welcome {user?.email}</span>
 *       ) : (
 *         <Link href="/login">Login</Link>
 *       )}
 *     </header>
 *   );
 * }
 * ```
 */
export function useAuthCheck() {
  const { user, isUserLoading, userError } = useUser();
  const isAuthenticated = !isUserLoading && !!user;

  return {
    user,
    isUserLoading,
    userError,
    isAuthenticated,
  };
}
