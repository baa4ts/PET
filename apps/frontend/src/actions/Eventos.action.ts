import axios from "axios";
import type { Evento, EventosResponse } from "@/types/EventosResponse";

export const getEventos = async (): Promise<Evento[]> => {
    const { data } = await axios.get<EventosResponse>("http://localhost:3000/api/eventos");
    return data.eventos;
};
