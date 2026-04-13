import { XIcon } from "@phosphor-icons/react";

import { getAusencias } from "@/actions/Ausencias.action";
import { formatearFecha } from "@/helpers/formatearFecha";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const SeccionAusencias = () => {
  const { data: ausencias = [] } = useQuery({
    queryKey: ["ausencias-tv"],
    queryFn: getAusencias,
    refetchInterval: 10_000,
    staleTime: 10_000,
  });

  const hayAusencias = ausencias.length > 0;
  const activo = ausencias.length > 2;

  return (
    <article className="flex-1 bg-white rounded shadow-sm flex flex-col overflow-hidden">
      <div className="text-lg font-semibold py-2 px-3 border-b border-gray-200">
        Ausencias
      </div>

      <div className="overflow-hidden h-full relative">
        <div className={cn("p-2 flex flex-col gap-2", activo && "animate-scroll")} id="contenedor-ausencias">
          {!hayAusencias && (
            <div className="w-full h-full min-h-full min-w-full flex items-center justify-center flex-col">
              <XIcon size={32} />
              <p>No hay ausencias</p>
            </div>
          )}

          {(activo ? [...ausencias, ...ausencias] : ausencias).map((item, i) => (
            <div
              className="flex shrink-0 flex-col h-24 bg-blue-400 px-3 justify-center rounded-sm shadow-sm hover:shadow-md transition"
              key={`${item.id}-${i}`}
            >
              <p className="text-lg font-bold text-white leading-tight">
                {item.docente.name}
              </p>
              <p className="text-blue-50 text-sm font-medium">
                {item.materia}
              </p>
              <p className="text-white text-xs mt-1">
                {formatearFecha(item.creado.toString())}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};