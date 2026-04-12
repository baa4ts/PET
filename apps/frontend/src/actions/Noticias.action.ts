import axios from "axios";

import type { Noticia, NoticiasResponse } from "@/types/NoticiasResponse";

export const getNoticias = async (): Promise<Noticia[]> => {
    const { data } = await axios.get<NoticiasResponse>("http://localhost:3000/api/noticias");
    return data.noticias;
};
