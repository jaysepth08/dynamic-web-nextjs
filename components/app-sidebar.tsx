"use client"

import * as React from "react"
import {
  LayoutDashboardIcon,
  ListIcon,
  UsersIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"


type User = {
  name: string
  email: string
  avatar?: string
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  
  navMain: [
    {
      title: "Pages",
      url: "/dashboard/admin",
      isActive: true,
      icon: LayoutDashboardIcon,
      
      items: [
        {
          title: "Home",
          url: "/dashboard/admin",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Users Lists",
          url: "/dashboard/admin/users",
          icon: UsersIcon,
        },
        {
          title: "Posts Lists",
          url: "/dashboard/admin/post",
          icon: ListIcon,
        },
      ],
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<User | null>(null)


  React.useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

        {/* <NavUser user={data.user} /> */}
       
        <SidebarFooter>
          {user && (
            <NavUser
              user={{
                name: user.name,
                email: user.email,
                avatar: user.avatar ?? "/default-avatar.png",
                id: "default-id", // Replace with a valid id if available
              }}
            />
          )}
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
  )
}
