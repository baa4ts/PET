import { AusenciasList } from "../../components/tv/AusenciasList";
import { EventosList } from "../../components/tv/EventosList";
import { NoticiasSlider } from "../../components/tv/NoticiasSlider";
import { SETausencias, SETeventos, SETnoticias } from "./tests";

export const Tv = () => (
  <section className="w-full h-screen flex flex-row-reverse bg-zinc-950">
    <aside className="w-2/6 h-full flex flex-col gap-3 p-4 border-l border-zinc-800">
      <EventosList eventos={SETeventos} />
      <AusenciasList ausencias={SETausencias} />
    </aside>
    <NoticiasSlider noticias={SETnoticias} />
  </section>
);