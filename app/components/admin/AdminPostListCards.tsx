"use client"

import { useEffect, useState } from "react"
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, MessageCircle } from "lucide-react"

export function AdminPostListsCards() {
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)
  const [totalComments, setTotalComments] = useState(0)

  useEffect(() => {
    async function fetchStats() {
      const [usersRes, postsRes, commentsRes] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/users"),
        fetch("https://jsonplaceholder.typicode.com/posts"),
        fetch("https://jsonplaceholder.typicode.com/comments"),
      ])

      const users = await usersRes.json()
      const posts = await postsRes.json()
      const comments = await commentsRes.json()

      setTotalUsers(users.length)
      setTotalPosts(posts.length)
      setTotalComments(comments.length)
    }

    fetchStats()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
      <Card className="mx-8 dark:bg-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription>Total Users</CardDescription>
          <Users className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl font-bold">{totalUsers}</CardTitle>
        </CardContent>
      </Card>

      <Card className="mx-8 dark:bg-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription>Total Posts</CardDescription>
          <FileText className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl font-bold">{totalPosts}</CardTitle>
        </CardContent>
      </Card>

      <Card className="mx-8 dark:bg-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardDescription>Total Comments</CardDescription>
          <MessageCircle className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl font-bold">{totalComments}</CardTitle>
        </CardContent>
      </Card>
    </div>
  )
}
