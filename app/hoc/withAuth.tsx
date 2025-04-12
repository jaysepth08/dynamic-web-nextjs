'use client';

import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user'; // only valid roles
}

const withAuth = <P extends object>(
  Component: ComponentType<P>,
  allowedRoles?: Array<'admin' | 'user'>
) => {
  const ProtectedComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const userData = localStorage.getItem('user');

      if (!userData) {
        router.push('/login');
        return;
      }

      let user: User;

      try {
        user = JSON.parse(userData);
      } catch {
        router.push('/login');
        return;
      }

      if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push('/unauthorized');
        return;
      }
    }, [router]);

    return <Component {...props} />;
  };

  return ProtectedComponent;
};

export default withAuth;
