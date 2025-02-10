'use client';

import React, { Dispatch, SetStateAction, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";
import { LuTicketCheck } from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa6";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getNewUsers, getAddedEventsCount, getRetentionRate, getTicketInteractions } from "@/services/HttpRequests";
import { useQuery } from "react-query";

const DataStatsCards = () => {
  // State to store the selected period
  const [period, setPeriod] = useState("monthly");

  // Fetch new users data
  const { data: newUsersData, isLoading: isLoadingNewUsers } = useQuery({
    queryKey: ["newUsers"],
    queryFn: getNewUsers,
    staleTime: 60 * 1000,
  });

  // Fetch other stats
  const { data: addedEventsCount } = useQuery({
    queryKey: ["addedEventsCount"],
    queryFn: getAddedEventsCount,
    staleTime: 60 * 1000,
  });

  const { data: retentionRate } = useQuery({
    queryKey: ["retentionRate"],
    queryFn: getRetentionRate,
    staleTime: 60 * 1000,
  });

  const { data: ticketInteractions } = useQuery({
    queryKey: ["ticketInteractions"],
    queryFn: getTicketInteractions,
    staleTime: 60 * 1000,
  });

  // Get new users count based on selected period
  const newUsersCount = newUsersData?.data?.[`${period}Users`] ?? "N/A";

  const stats = [
    {
      id: 1,
      title: "New Users",
      value: isLoadingNewUsers ? "Loading..." : newUsersCount,
      icon: <FaUsers />,
    },
    {
      id: 2,
      title: "Monthly Added Events",
      value: addedEventsCount?.data?.monthlyEvents ?? "N/A",
      icon: <MdOutlineEventAvailable />,
    },
    {
      id: 3,
      title: "User Retention Rate",
      value: retentionRate?.data?.retentionRate ?? "N/A",
      icon: <FaUserCheck />,
    },
    {
      id: 4,
      title: "Ticket Interaction",
      value: ticketInteractions?.data?.ticketInteractions ?? "N/A",
      icon: <LuTicketCheck />,
    },
  ];

  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-10">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-[#f5f5f4] dark:bg-[#262626] relative rounded-3xl md:p-6 p-3 flex flex-col md:gap-4 gap-3 transition-all duration-300 overflow-hidden"
        >
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="rounded-full text-2xl">{stat.icon}</div>
              <h3 className="text-md font-bold text-black dark:text-white truncate">{stat.title}</h3>
            </div>
            {stat.title === "New Users" && <SelectPeriod period={period} setPeriod={setPeriod} />}
          </div>
          <span className="lg:text-4xl text-3xl font-bold text-gray-900 dark:text-white truncate">{stat.value}</span>
          <div className="flex text-md md:gap-2 gap-1">
            <p className="text-[#494949] dark:text-[#ddd]">Last Month</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// SelectPeriod Component
export function SelectPeriod({ period, setPeriod } : {period: string, setPeriod: Dispatch<SetStateAction<string>> }) {
  return (
    <Select value={period} onValueChange={setPeriod}>
      <SelectTrigger className="w-[110px] h-6">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="daily">Daily</SelectItem>
        <SelectItem value="weekly">Weekly</SelectItem>
        <SelectItem value="monthly">Monthly</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default DataStatsCards;
