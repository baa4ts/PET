import { Link, useLocation, useNavigate } from "react-router"

import { cerrarSession, Client } from "@/providers/Client.provider"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { SidebarTrigger } from "../ui/sidebar"

export const DashboardHead = () => {
    const navigate = useNavigate()
    const ruta = useLocation()
    const path = ruta.pathname.split("/").filter(Boolean)

    const { data: session } = Client.useSession()

    return (
        <header className="flex flex-col gap-2 border-b bg-white px-4 py-2">
            {/* Row principal */}
            <div className="flex w-full">
                {/* Izquierda */}
                <div className="flex w-1/2 flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger />
                        <h1 className="text-sm font-medium">Dashboard</h1>
                    </div>

                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard">{path[0]}</BreadcrumbLink>
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
                </div>

                {/* Derecha */}
                <div className="text-muted-foreground flex w-1/2 items-center justify-end pr-2 text-sm">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">{session?.user.name ?? "Cuenta"}</Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56">
                            {/* Info usuario */}
                            <div className="px-2 py-1.5 text-sm">
                                <p className="text-foreground font-medium">{session?.user.name}</p>
                                {session?.user.email && <p className="text-muted-foreground text-xs">{session.user.email}</p>}
                                {/* Permisos */}
                                {session?.user.permisos && Object.keys(session.user.permisos).length > 0 && (
                                    <div className="mt-1 flex flex-wrap gap-1">
                                        {Object.keys(session.user.permisos).map((modulo) => (
                                            <span className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-xs" key={modulo}>
                                                {modulo}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link to={{ pathname: "/usuario" }}>Perfil</Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    className="text-red-600"
                                    // Cerrar la session
                                    onClick={() => cerrarSession(() => navigate("/autenticacion/login"))}
                                >
                                    Cerrar sesion
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
