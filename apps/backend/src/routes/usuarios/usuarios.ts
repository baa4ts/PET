import { Request, Response, Router } from "express";
import { SchemeLogin, SchemeRefresh, SchemeRegister } from "./usuarios.scheme";
import { conPrisma } from "../../prestamos/conPrisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SessionCheck, SessionLevelsCheck } from "../../middleware/Session";

/**
 * Instancia
 */
const API = Router();

API.post("/login", async (req: Request, res: Response) => {
  try {
    const parse = SchemeLogin.safeParse(req.body);

    // Verificar los type de los datos
    if (!parse.success) {
      return res
        .status(400)
        .json({ message: parse.error.format(), token: null });
    }

    // Realizar la consulta
    const usuario = await conPrisma((prisma) =>
      prisma.usuario.findFirst({
        where: { cedula: parse.data.cedula },
        omit: {
          creado_at: true,
          actualizado_at: true,
        }
      }),
    );

    // Si no existe
    if (!usuario) {
      return res
        .status(401)
        .json({ message: "El usuario no existe", token: null });
    }

    // Comparar contraseña del input con hash de la DB
    if (!(await bcrypt.compare(parse.data.password, usuario.pass_hash))) {
      return res
        .status(401)
        .json({ message: "Contraseña incorrecta", token: null });
    }

    // Guardar la session en la base de datos
    await conPrisma(async (prisma) => {
      const vencimiento = new Date(Date.now() + 60 * 60 * 1000);
      const { pass_hash, ...session } = usuario;

      await prisma.session.upsert({
        where: { key: usuario.cedula },
        update: { value: JSON.stringify(session), vencimiento },
        create: {
          key: usuario.cedula,
          value: JSON.stringify(session),
          vencimiento,
        },
      });
    });

    const token = jwt.sign(
      { cedula: usuario.cedula },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    return res.status(200).json({ message: "OK", token });
  } catch (error) {
    return res.status(500).json({ message: "Error interno", token: null });
  }
});

API.post("/register", async (req: Request, res: Response) => {
  try {
    const parse = SchemeRegister.safeParse(req.body);

    // Verificar los type de los datos
    if (!parse.success) {
      return res
        .status(400)
        .json({ message: parse.error.format(), token: null });
    }

    // Verificar si la cedula o email ya estan registrados
    const existe = await conPrisma((prisma) =>
      prisma.usuario.findFirst({
        where: {
          OR: [{ cedula: parse.data.cedula }, { email: parse.data.email }],
        },
      }),
    );

    if (existe) {
      return res
        .status(409)
        .json({ message: "La cédula o email ya está registrado", token: null });
    }

    // Hashear la contraseña
    const passhash = await bcrypt.hash(parse.data.password, 10);

    // Crear el usuario (sin passhash ni timestamps en el retorno)
    const usuario = await conPrisma((prisma) =>
      prisma.usuario.create({
        data: {
          cedula: parse.data.cedula,
          email: parse.data.email,
          primer_nombre: parse.data.primer_nombre,
          segundo_nombre: parse.data.segundo_nombre,
          primer_apellido: parse.data.primer_apellido,
          segundo_apellido: parse.data.segundo_apellido,
          telefono: parse.data.telefono,
          pass_hash: passhash,
        },
        omit: {
          pass_hash: true,
          creado_at: true,
          actualizado_at: true,
        },
      }),
    );

    // Guardar la session en la base de datos
    await conPrisma(async (prisma) => {
      const vencimiento = new Date(Date.now() + 60 * 60 * 1000);

      await prisma.session.upsert({
        where: { key: usuario.cedula },
        update: { value: JSON.stringify(usuario), vencimiento },
        create: {
          key: usuario.cedula,
          value: JSON.stringify(usuario),
          vencimiento,
        },
      });
    });

    const token = jwt.sign(
      { cedula: usuario.cedula },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    return res.status(201).json({ message: "OK", token });
  } catch (error) {
    return res.status(500).json({ message: "Error interno", token: null });
  }
});


API.get(
  "/refresh",

  /**
   * Chain of Responsibility
   */
  SessionCheck,

  // Logica principal del end-point
  async (req: Request, res: Response) => {
    try {
      // ya garantizado por SessionCheck
      const usuario = req.usuario!;

      // Renovar vencimiento de la sesion
      await conPrisma((prisma) =>
        prisma.session.update({
          where: { key: usuario.cedula },
          data: { vencimiento: new Date(Date.now() + 60 * 60 * 1000) }, // +1h
        })
      );

      // Generar nuevo token
      const newToken = jwt.sign(
        { cedula: usuario.cedula },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ message: "OK", token: newToken });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno", token: null });
    }
  }
);


API.delete("/logout",

  /**
   * Chain of Responsibility
   */
  SessionCheck,

  // Logica principal del end-point
  async (req: Request, res: Response) => {
    try {

      await conPrisma(async (p) =>
        p.session.delete({ where: { key: req.usuario!.cedula } })
      );

      return res.status(200).json({ message: "Session cerrada exitosamente" });

    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(401).json({ message: "No se encontro la session" });
      }
      return res.status(500).json({ message: "Error interno" });
    }
  });

/**
 * Exports
 */
export { API as RouteUsuarios };
