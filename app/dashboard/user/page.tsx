
'use client';
import dynamic from 'next/dynamic';

const RegularUserDashboardClient = dynamic(() => import('../../components/users/RegularUserDashboardClient'), { ssr: false });

export default function Page() {
  return <RegularUserDashboardClient />;
}