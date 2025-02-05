import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-svh w-full items-center justify-center px-6 md:px-0">
      {children}
    </div>
  );
};

export default Layout;
