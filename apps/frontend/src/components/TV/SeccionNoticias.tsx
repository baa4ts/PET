import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from "react";

import { getNoticias } from "@/actions/Noticias.action";
import { formatearFecha } from "@/helpers/formatearFecha";

export const SeccionNoticias = () => {
  const [actual, setActual] = useState(0);
  const [restante, setRestante] = useState(4);
  const [visible, setVisible] = useState(true);

  const { data: noticias = [] } = useQuery({
    queryKey: ["noticias-tv"],
    queryFn: getNoticias,
    refetchInterval: 10_000,
    staleTime: 10_000,
  });

  useEffect(() => {
    if (noticias.length === 0) return;

    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setActual(prev => (prev + 1) % noticias.length);
        setRestante(4);
        setVisible(true);
      }, 400);
    }, 5000);

    const countdown = setInterval(() => {
      setRestante(prev => (prev <= 1 ? 4 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, [noticias.length]);

  const noticia = noticias[actual];

  return (
    <article className="flex-4 p-4 min-h-0">
      {noticias.length === 0 && (
        <div className="w-full h-full flex items-center justify-center rounded bg-zinc-900">
          <p className="text-zinc-500 text-sm">No hay noticias</p>
        </div>
      )}

      {noticia && (
        <div className="w-full h-full overflow-hidden bg-zinc-900 rounded relative">
          <img
            alt=""
            className="w-full h-full object-contain"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 400ms' }}
            src={"http://localhost:3000/static/" + noticia.recursos[0].resource}
          />
          <span
            className="absolute bottom-4 left-4 right-4 z-50 flex flex-col gap-1 bg-black/60 backdrop-blur-sm rounded p-3"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 400ms' }}
          >
            <div className="flex flex-row items-baseline gap-4">
              <h1 className="text-white text-2xl font-bold flex-1/2">{noticia.titulo}</h1>
              <p className="text-zinc-300 text-sm flex-1/2 flex items-center justify-end pr-5">
                {formatearFecha(noticia.publicado.toString())}
              </p>
            </div>
            <p className="text-zinc-300 text-sm">{noticia.descripcion}</p>
          </span>

          <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded px-3 py-1 text-white text-sm font-mono">
            {restante}s
          </span>
        </div>
      )}
    </article>
  );
};