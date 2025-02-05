'use client';
import { redirect } from 'next/navigation';
import React, { useLayoutEffect } from 'react';

const Home = () => {
  useLayoutEffect(() => {
    redirect('/dashboard');
  }, []);
  return <div>Home</div>;
};

export default Home;
