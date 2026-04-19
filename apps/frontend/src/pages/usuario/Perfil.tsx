import { ArrowLeftIcon, ArrowRightIcon, EnvelopeIcon, IdentificationCardIcon, ShieldCheckIcon } from "@phosphor-icons/react"
import { useMemo } from "react"
import { Link } from "react-router"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { parsearPermisos } from "@/helpers/permisos"
import { Client } from "@/providers/Client.provider"

export const Perfil = () => {
    const { data: session } = Client.useSession()

    const permisos = useMemo(() => parsearPermisos(session?.user.permisos), [session?.user.permisos])

    const isEditor = useMemo(() => (permisos ? Object.keys(permisos).length > 0 : false), [permisos])

    return (
        <div className="bg-muted/40 flex min-h-screen items-center justify-center p-6">
            <div className="flex w-full max-w-md flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Mi perfil</h1>
                    <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline">
                            <Link to="/">
                                <ArrowLeftIcon size={16} />
                                Inicio
                            </Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                            <Link to="/tv">TV</Link>
                        </Button>
                        <Button asChild disabled={!isEditor} size="sm" variant="outline">
                            <Link to="/dashboard">
                                Dashboard
                                <ArrowRightIcon size={16} />
                            </Link>
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary text-primary-foreground flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold">
                                {session?.user.name?.charAt(0).toUpperCase() ?? "?"}
                            </div>
                            <div>
                                <CardTitle className="text-base">{session?.user.name}</CardTitle>
                                <p className="text-muted-foreground text-sm">{session?.user.email}</p>
                            </div>
                        </div>
                    </CardHeader>

                    <Separator />

                    <CardContent className="flex flex-col gap-3 pt-4">
                        <div className="flex items-center gap-2 text-sm">
                            <IdentificationCardIcon className="text-muted-foreground" size={16} />
                            <span className="text-muted-foreground">Nombre</span>
                            <span className="ml-auto font-medium">{session?.user.name ?? "-"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <EnvelopeIcon className="text-muted-foreground" size={16} />
                            <span className="text-muted-foreground">Email</span>
                            <span className="ml-auto font-medium">{session?.user.email ?? "-"}</span>
                        </div>

                        {isEditor && permisos && (
                            <div className="flex items-start gap-2 text-sm">
                                <ShieldCheckIcon className="text-muted-foreground mt-0.5" size={16} />
                                <span className="text-muted-foreground">Permisos</span>
                                <div className="ml-auto flex flex-wrap justify-end gap-1">
                                    {Object.keys(permisos).map((modulo) => (
                                        <Badge key={modulo} variant="secondary">
                                            {modulo}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
