import { CalendarX } from "lucide-react";
import { AutoScroll } from "./AutoScroll";
import { Empty } from "./Empty";

export const EventosList = ({ eventos }: { eventos: Eventos }) => (
  <div className="flex-1 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 shrink-0">
      <span className="w-2 h-2 rounded-full bg-blue-500" />
      <h2 className="text-white/90 text-xs font-semibold tracking-widest uppercase">Eventos</h2>
    </div>
    {eventos.length === 0 ? (
      <Empty icon={CalendarX} label="Sin eventos por ahora" />
    ) : (
      <AutoScroll speed={20}>
        {eventos.map((evento) => (
          <div key={evento.id} className="px-4 py-3 border-b border-zinc-800 flex flex-col gap-1">
            <span className="text-white font-semibold text-sm">{evento.nombre}</span>
            <span className="text-zinc-400 text-xs">{evento.descripcion}</span>
            <span className="text-zinc-500 text-xs">
              {evento.fecha.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
            </span>
          </div>
        ))}
      </AutoScroll>
    )}
  </div>
);