'use client';

import MainDashboard from '@/components/dashboard/MainDashboard';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';


const Dashboard = () => {
  useSetBreadcrumb({ breadcrumbPath: '/dashboard' });
  return(
    <>
        <MainDashboard/>
    </>
  )
};

export default Dashboard;
