import type { Evento, EventosResponse } from "@/types/EventosResponse";

import { API } from "../configuracion/API.config";

export const getEventos = async (): Promise<Evento[]> => {
    const { data } = await API.get<EventosResponse>("/eventos");
    return data.eventos;
};
