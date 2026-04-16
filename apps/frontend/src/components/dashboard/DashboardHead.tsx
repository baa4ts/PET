import { useLocation } from "react-router"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "../ui/breadcrumb"
import { SidebarTrigger } from "../ui/sidebar"

export const DashboardHead = () => {
    const ruta = useLocation()
    const path = ruta.pathname.split("/").filter(Boolean)

    return (
        <header className="flex flex-col px-4 border-b bg-white py-2 gap-1">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-sm font-medium">Dashboard</h1>
            </div>

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">
                            {path[0]}
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    {path.length > 1 && (
                        <>
                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>{path[1]}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    )
}