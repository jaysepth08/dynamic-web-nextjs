"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";


const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminCharts() {
    const [userCount, setUserCount] = useState(0);
    const [postCount, setPostCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const usersRes = await fetch("https://jsonplaceholder.typicode.com/users");
            const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts");
            const commentsRes = await fetch("https://jsonplaceholder.typicode.com/comments");

            const users = await usersRes.json();
            const posts = await postsRes.json();
            const comments = await commentsRes.json();

            setUserCount(users.length);
            setPostCount(posts.length);
            setCommentCount(comments.length);
        };

        fetchData();
    }, []);

    const chartOptions = {
        chart: {
            id: "basic-bar",
        },
        xaxis: {
            categories: ["Users", "Posts", "Comments"],
        },
    };

    const chartSeries = [
        {
            name: "Count",
            data: [userCount, postCount, commentCount],
        },
    ];

    return (
        <div className="mt-8 w-full md:w-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Admin Data Visualization</h2>
            <Chart options={chartOptions} series={chartSeries} type="bar" width="100%" height={350} />
        </div>
    );
}
