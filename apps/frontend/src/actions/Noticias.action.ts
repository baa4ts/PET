import type { Noticia, NoticiasResponse } from "@/types/NoticiasResponse";

import { API } from "../configuracion/API.config";

export const getNoticias = async (): Promise<Noticia[]> => {
    const { data } = await API.get<NoticiasResponse>("/noticias");
    return data.noticias;
};
