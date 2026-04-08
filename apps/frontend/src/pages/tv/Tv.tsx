import { TvAusencias } from "../../components/tv/TvAusencias";
import { TvEventos } from "../../components/tv/TvEventos";
import { TvNoticias } from "../../components/tv/TvNoticias";

export const Tv = () => {
  return (
    <section className="w-full h-screen flex flex-row-reverse bg-zinc-950 text-white font-mono">

      {/* Aside de noticias */}
      <aside className="w-2/6 h-full flex flex-col gap-4 p-8 border-l border-zinc-700">
        <TvAusencias />
        <TvEventos />
      </aside>

      {/* Panel principal */}
      <TvNoticias />

    </section >
  )
}