import { SeccionAusencias } from "@/components/TV/SeccionAusencias";
import { SeccionEventos } from "@/components/TV/SeccionEventos";
import { SeccionNoticias } from "@/components/TV/SeccionNoticias";

export const Tv = () => {


    return (
        <section className="w-screen h-screen flex flex-row overflow-hidden bg-blue-600">

            {/* Noticias */}
            <SeccionNoticias />

            {/* Panel derecho */}
            <section className="w-2/6 flex flex-col p-4 gap-3 h-full">

                <SeccionAusencias />
                <SeccionEventos />

            </section>
        </section>
    );
};