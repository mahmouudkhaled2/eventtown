// 'use client';

// import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@/components/ui/chart';
// import { useQuery } from 'react-query';
// import { getMostUsedCategories } from '@/services/HttpRequests';
// import { CategoryType } from '@/types/analytics.types';

// const chartConfig = {
//   usage: {
//     label: 'Usage Count',
//     color: 'hsl(var(--chart-1))'
//   },
// } satisfies ChartConfig;

// export function MostUsedCategoriesChart() {
//   // Fetch most used categories
//   const { data: mostUsedCat, isLoading, error } = useQuery({
//     queryKey: ['mostUsedCategories'],
//     queryFn: getMostUsedCategories,
//     staleTime: 60 * 1000,
//   });

//   // Transform API data into chart-friendly format
//   const chartData = mostUsedCat?.data?.map((category: CategoryType) => ({
//     category: category.title,
//     usage: category.usageCount,
//   })) || [];

//   return (
//     <Card className="mb-10 max-w-xl">
//       <CardHeader>
//         <CardTitle>Most Used Categories</CardTitle>
//         <CardDescription>Based on event usage data</CardDescription>
//       </CardHeader>
//       <CardContent className="">
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p className="text-red-500">Failed to load data.</p>
//         ) : (
//           <ChartContainer config={chartConfig}>
//             <BarChart
//               data={chartData}
//               margin={{
//                 top: 20,
//               }}
//             >
//               <CartesianGrid vertical={false} />
//               <XAxis
//                 dataKey="category"
//                 tickLine={false}
//                 tickMargin={12}
//                 axisLine={false}
//               />
//               <ChartTooltip
//                 cursor={false}
//                 content={<ChartTooltipContent hideLabel />}
//               />
//               <Bar dataKey="usage" fill="hsl(var(--chart-1))" radius={8}>
//                 <LabelList
//                   position="top"
//                   offset={12}
//                   className="fill-foreground"
//                   fontSize={12}
//                 />
//               </Bar>
//             </BarChart>
//           </ChartContainer>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, ResponsiveContainer } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from 'react-query';
import { getMostUsedCategories } from '@/services/HttpRequests';
import { CategoryType } from '@/types/analytics.types';

const chartConfig = {
  usage: {
    label: "Usage Count",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export default function MostUsedCategoriesChart() {

  // Fetch most used categories
  const { data: mostUsedCat, isLoading, error } = useQuery({
    queryKey: ['mostUsedCategories'],
    queryFn: getMostUsedCategories,
    staleTime: 60 * 1000,
  });

  // Transform API data into chart-friendly format
  const chartData = mostUsedCat?.data?.map((category: CategoryType, index: number) => ({
    index: index + 1, // Convert categories into numbers
    category: category.title,
    usage: category.usageCount,
  })) || [];

  return (
    <>
      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Most Used Categories</CardTitle>
          <CardDescription>Based on event usage data</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">Failed to load data.</p>
          ) : (
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  layout="vertical"
                  margin={{
                    right: 16,
                  }}
                >
                  <CartesianGrid horizontal={false} />
                  <YAxis
                    dataKey="index"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <XAxis dataKey="usage" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Bar
                    dataKey="usage"
                    layout="vertical"
                    fill="hsl(var(--chart-1))"
                    radius={4}
                    barSize={35}
                  >
                    <LabelList
                      dataKey="category"
                      position="insideLeft"
                      offset={8}
                      className="fill-[--color-label]"
                      fontSize={12}
                    />
                    <LabelList
                      dataKey="usage"
                      position="right"
                      offset={8}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </>
  );
}
