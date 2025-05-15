'use client';
import dynamic from 'next/dynamic';

const AdminDashboardClient = dynamic(() => import('../../components/admin/AdminDashboardClient'), { ssr: false });

export default function Page() {
  return <AdminDashboardClient />;
}