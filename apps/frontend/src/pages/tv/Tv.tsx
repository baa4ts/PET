import { SeccionAusencias } from "@/components/TV/SeccionAusencias"
import { SeccionEventos } from "@/components/TV/SeccionEventos"
import { SeccionNoticias } from "@/components/TV/SeccionNoticias"

export const Tv = () => {
    return (
        <section className="flex h-screen w-screen flex-row overflow-hidden bg-blue-600">
            {/* Noticias */}
            <SeccionNoticias />

            {/* Panel derecho */}
            <section className="flex h-full w-2/6 flex-col gap-3 p-4">
                <SeccionAusencias />
                <SeccionEventos />
            </section>
        </section>
    )
}
