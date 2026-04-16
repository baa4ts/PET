import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { DashboardHead } from "@/components/dashboard/DashboardHead"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router"

export const Dashboard = () => {
    return (
        <SidebarProvider>
            <AppSidebar />

            <main className="flex flex-col w-full">

                <DashboardHead />

                {/* Contenido */}
                <div className="p-4">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}