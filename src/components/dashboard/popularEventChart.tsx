'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "react-query";
import { getPopularEvents } from "@/services/HttpRequests";
import { Event } from "@/types/event.types";
import Link from "next/link";

const chartConfig = {
  attendance: {
    label: "Attendees",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ChartData {
  eventName: string;
  attendees: number;
  id: string;
}

export default function PopularEventsChart() {
  // Fetch popular events
  const { data: popularEvents, isLoading, error } = useQuery({
    queryKey: ["popularEvents"],
    queryFn: getPopularEvents,
    staleTime: 60 * 1000,
  });

  // Transform API data into chart-friendly format
  const chartData: ChartData[] =
    popularEvents?.data?.map((event: Event) => ({
      eventName: event.eventName,
      attendees: event.numberOfGoingUsers,
      id: event.id,
    })) || [];

  return (
    <Card className="mb-10">
      <CardHeader>
        <CardTitle>Popular Events</CardTitle>
        <CardDescription>Based on attendee numbers</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load data.</p>
        ) : (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="eventName"
                  tick={({ payload, x, y }: { payload: { value: string }, x: number, y: number }) => {
                    const event = chartData.find((e) => e.eventName === payload.value);
                    return (
                      <Link href={`/events/${event?.id}`} passHref>
                        <text x={x} y={y} dy={16} textAnchor="middle" fill="hsl(var(--chart-1))" fontSize={12} className="hover:underline">
                          {payload.value}
                        </text>
                      </Link>
                    );
                  }}
                  height={60}
                  interval={0}
                />
                <YAxis/>
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="attendees"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}