type ActionResult =
    | { ok: true; datos: Usuario }
    | { ok: false; message: string };