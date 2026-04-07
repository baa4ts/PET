import { UserX } from "lucide-react";
import { AutoScroll } from "./AutoScroll";
import { Empty } from "./Empty";

export const AusenciasList = ({ ausencias }: { ausencias: Ausencias }) => (
  <div className="flex-1 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 shrink-0">
      <span className="w-2 h-2 rounded-full bg-red-500" />
      <h2 className="text-white/90 text-xs font-semibold tracking-widest uppercase">Ausencias</h2>
    </div>
    {ausencias.length === 0 ? (
      <Empty icon={UserX} label="Sin ausencias registradas" />
    ) : (
      <AutoScroll speed={25}>
        {ausencias.map((ausencia, i) => (
          <div key={i} className="px-4 py-3 border-b border-zinc-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {ausencia.usuario.primer_nombre[0]}{ausencia.usuario.primer_apellido[0]}
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-medium">
                {ausencia.usuario.primer_nombre} {ausencia.usuario.primer_apellido}
              </span>
              <span className="text-zinc-400 text-xs">{ausencia.materia}</span>
            </div>
          </div>
        ))}
      </AutoScroll>
    )}
  </div>
);