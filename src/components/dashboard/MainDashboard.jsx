'use client';

import DataStatsCards from "./DataStatsCards";
import MostUsedCategoriesChart from "@/components/dashboard/MostUsedCategoriesChart";
import PopularEventsChart from "@/components/dashboard/popularEventChart";

const MainDashboard = () => {
  return (
    <section className="">
      {/* Main Heading */}
      <div className="mb-4">
        <h1 className="font-bold text-2xl underline">All Statistics</h1>
      </div>

      {/* Statistics Cards */}
      <div className="mb-10">
        <DataStatsCards />
      </div>

      {/* Reports Heading */}
      <div className="mb-4">
        <h1 className="font-bold text-2xl underline">Reports</h1>
      </div>

      {/* Data Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full h-[400px] bg-gray-100 rounded-lg">
          <MostUsedCategoriesChart />
        </div>
        <div className="w-full h-[400px] bg-gray-100 rounded-lg">
          <PopularEventsChart />
        </div>
      </div>
    </section>
  );
};

export default MainDashboard;