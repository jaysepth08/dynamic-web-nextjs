"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function AdminCharts() {
  const [chartData, setChartData] = useState([
    { category: "Users", count: 0 },
    { category: "Posts", count: 0 },
    { category: "Comments", count: 0 },
  ]);

  const chartConfig = {
    count: {
      label: "Total",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    const fetchData = async () => {
      const [usersRes, postsRes, commentsRes] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/users"),
        fetch("https://jsonplaceholder.typicode.com/posts"),
        fetch("https://jsonplaceholder.typicode.com/comments"),
      ]);

      const users = await usersRes.json();
      const posts = await postsRes.json();
      const comments = await commentsRes.json();

      setChartData([
        { category: "Users", count: users.length },
        { category: "Posts", count: posts.length },
        { category: "Comments", count: comments.length },
      ]);
    };

    fetchData();
  }, []);

  return (
    <Card className="flex flex-col gap-4 p-6 rounded-lg shadow-md">
      <CardHeader>
        <CardTitle>System Metrics</CardTitle>
        <CardDescription>User, Post, and Comment Counts</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer 
        config={chartConfig}
        className="aspect-auto h-[250px] w-full">
          <BarChart width={300} height={200} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="count"
              fill="var(--color-count)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing latest data from JSONPlaceholder API
        </div>
      </CardFooter>
    </Card>
  );
}
