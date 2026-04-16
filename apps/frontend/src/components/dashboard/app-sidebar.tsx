import {
    BookOpenTextIcon,
    CalendarIcon,
    ChartBarIcon,
    UserIcon,
    UsersThreeIcon} from "@phosphor-icons/react"
import { Link } from "react-router"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader />

            <SidebarContent>
                {/* Seccion Gestion */}
                <SidebarGroup>
                    <SidebarGroupLabel>Gestion</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/dashboard/noticias">
                                        <BookOpenTextIcon size={20} />
                                        <span>Noticias</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/dashboard/eventos">
                                        <CalendarIcon size={20} />
                                        <span>Eventos</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/dashboard/ausencias">
                                        <UsersThreeIcon size={20} />
                                        <span>Ausencias</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Seccion Estadisticas */}
                <SidebarGroup>
                    <SidebarGroupLabel>Estadisticas</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/dashboard/estadisticas-resumen">
                                        <ChartBarIcon size={20} />
                                        <span>Resumen</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Seccion Gestion usuarios */}
                <SidebarGroup>
                    <SidebarGroupLabel>Gestion usuarios</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/dashboard/gestion-usuarios">
                                        <UserIcon size={20} />
                                        <span>Usuarios</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    )
}