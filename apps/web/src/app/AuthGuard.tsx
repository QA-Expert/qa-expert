'use client';

import { useReactiveVar } from '@apollo/client';
import { isAuthenticated } from 'apollo/store';
import { PUBLIC_ROUTES } from 'constants/constants';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { matchesPathname } from 'utils/url';

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const isUserAuthenticated = useReactiveVar(isAuthenticated);
  const isPublicPath = Boolean(
    PUBLIC_ROUTES.find((expectedPathname) =>
      matchesPathname(expectedPathname, path),
    ),
  );

  useEffect(() => {
    if (!isUserAuthenticated && !isPublicPath) {
      router.push('/login');
    }
  }, [isUserAuthenticated, router, isPublicPath, path]);

  return <>{children}</>;
}
