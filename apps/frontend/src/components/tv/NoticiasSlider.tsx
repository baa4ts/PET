import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Newspaper } from "lucide-react";
import { Empty } from "./Empty";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/effect-fade";

export const NoticiasSlider = ({ noticias }: { noticias: Noticias }) => (
    <article className="w-4/6 h-full flex flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h1 className="text-white/90 text-sm font-semibold tracking-widest uppercase">Noticias</h1>
        </div>
        {noticias.length === 0 ? (
            <div className="flex-1 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center">
                <Empty icon={Newspaper} label="No hay noticias disponibles" />
            </div>
        ) : (
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                className="w-full flex-1 rounded-2xl overflow-hidden"
            >
                {noticias.map((noticia) => (
                    <SwiperSlide key={noticia.id} className="relative">
                        <img
                            src={noticia.recursos[0]?.resource}
                            alt={noticia.titulo}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 text-white max-w-2xl">
                            <span className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-3 block">
                                Ultima hora
                            </span>
                            <h2 className="text-4xl font-bold leading-tight mb-3">{noticia.titulo}</h2>
                            <p className="text-base text-white/70 leading-relaxed">{noticia.descripcion}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        )}
    </article>
);