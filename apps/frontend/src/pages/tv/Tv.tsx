import { SeccionAusencias } from "@/components/TV/SeccionAusencias";
import { SeccionEventos } from "@/components/TV/SeccionEventos";
import { SeccionNoticias } from "@/components/TV/SeccionNoticias";

export const Tv = () => {


    return (
        <section className="w-screen h-screen flex flex-col md:flex-row overflow-hidden bg-radial-[at_25%_25%] from-yellow-100 to-sky-400 to-95%">

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