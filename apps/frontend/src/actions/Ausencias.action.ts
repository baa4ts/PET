import axios from "axios";

import type { Ausencia, AusenciasResponse } from "@/types/AusenciasResponse";

export const getAusencias = async (): Promise<Ausencia[]> => {
    const { data } = await axios.get<AusenciasResponse>("http://localhost:3000/api/ausencias");
    return data.ausencias;
};
