'use client';

import withAuth from '../../hoc/withAuth';
import AdminDashboard from '../admin/AdminDashboardClient';

const ProtectedDashboard = withAuth(AdminDashboard, ['admin']);

export default ProtectedDashboard;
