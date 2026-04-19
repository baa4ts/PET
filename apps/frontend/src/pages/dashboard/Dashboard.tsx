import { Outlet } from "react-router"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { DashboardHead } from "@/components/dashboard/DashboardHead"
import { SidebarProvider } from "@/components/ui/sidebar"

export const Dashboard = () => {
    return (
        <SidebarProvider>
            <AppSidebar />

            <main className="flex w-full flex-col">
                <DashboardHead />

                {/* Contenido */}
                <div className="p-4">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}
