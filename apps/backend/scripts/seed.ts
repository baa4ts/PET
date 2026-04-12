// scripts/seed.ts
import "dotenv/config"

import fs from "node:fs"
import path from "node:path"

import { auth } from "../src/configuracion/Auth"
import { prisma } from "../src/configuracion/Prisma"

const BASE_URL = "http://localhost:3000/api"
const BASE_URL_AUTH = "http://localhost:3000"

// ─── Helpers ────────────────────────────────────────────────────────────────

function Home(relative: string, create = false): string {
  const full = path.join(process.cwd(), relative)
  if (create && !fs.existsSync(full)) fs.mkdirSync(full, { recursive: true })
  return full
}

async function crearUsuario(name: string, email: string, password: string, role?: string) {
  await auth.api.signUpEmail({ body: { name, email, password } })
  if (role) {
    await prisma.user.update({ where: { email }, data: { role } })
  }
  return await prisma.user.findUnique({ where: { email } })
}

/** Login via HTTP y retorna la cookie de sesion */
async function loginHTTP(email: string, password: string): Promise<string> {
  const res = await fetch(`${BASE_URL_AUTH}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  const setCookie = res.headers.get("set-cookie")
  if (!setCookie) {
    const texto = await res.text()
    throw new Error(`Login fallido para ${email} — ${res.status}: ${texto}`)
  }

  return setCookie.split(",").map(c => c.split(";")[0].trim()).join("; ")
}

/** Publica una noticia via HTTP con multipart/form-data */
async function publicarNoticiaHTTP(
  cookie: string,
  titulo: string,
  descripcion: string,
  imagenPath?: string,
  fechaOverride?: Date
) {
  const form = new FormData()
  form.append("titulo", titulo)
  form.append("descripcion", descripcion)

  if (imagenPath && fs.existsSync(imagenPath)) {
    const buffer = fs.readFileSync(imagenPath)
    const blob = new Blob([buffer], { type: "image/png" })
    form.append("recursos", blob, path.basename(imagenPath))
  }

  const res = await fetch(`${BASE_URL}/noticias`, {
    method: "POST",
    headers: {
      "Cookie": cookie,
      "Origin": "http://localhost:3000"
    },
    body: form,
  })

  const json = await res.json() as { mensaje: string, noticias: { id: number }[] }

  // Sobreescribir fecha en db para simular noticias vencidas o con delay
  if (fechaOverride && json.noticias?.[0]?.id) {
    await prisma.noticia.update({
      where: { id: json.noticias[0].id },
      data: { publicado: fechaOverride }
    })
  }

  return json
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {

  console.log("🗑️  Limpiando base de datos...")

  await prisma.recurso.deleteMany()
  await prisma.noticia.deleteMany()
  await prisma.ausencia.deleteMany()
  await prisma.eventos.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  console.log("✅ Base de datos limpia\n")

  // ─── Crear carpeta de estaticos ──────────────────────────────────────────

  const carpetaRecursos = Home(process.env.STATIC!, true)
  console.log(`📁 Carpeta de recursos: ${carpetaRecursos}\n`)

  // ─── Detectar imagenes desde scripts/ ───────────────────────────────────

  console.log("🖼️  Detectando imagenes...")

  const imagenesDisponibles: string[] = []
  const carpetaScripts = path.join(process.cwd(), "scripts")

  for (const archivo of fs.readdirSync(carpetaScripts)) {
    if (/^\d+\.png$/i.test(archivo)) {
      imagenesDisponibles.push(archivo)
      console.log(`  ✅ ${archivo} encontrada`)
    }
  }

  if (imagenesDisponibles.length === 0) {
    console.warn("  ⚠️  No se encontraron imagenes (1.png - N.png)\n")
  } else {
    imagenesDisponibles.sort((a, b) => parseInt(a) - parseInt(b))
    console.log(`  📦 ${imagenesDisponibles.length} imagenes disponibles\n`)
  }

  // ─── Usuarios ────────────────────────────────────────────────────────────

  console.log("👤 Creando usuarios...")

  await crearUsuario("Admin Root", "root@admin.com", "abc123456", "root")
  console.log("  ✅ root@admin.com — rol: root")

  const usuariosNoticias: NonNullable<Awaited<ReturnType<typeof crearUsuario>>>[] = []
  for (let i = 1; i <= 5; i++) {
    const u = await crearUsuario(`Editor Noticias ${i}`, `noticias${i}@admin.com`, "abc123456", "noticias")
    usuariosNoticias.push(u!)
    console.log(`  ✅ noticias${i}@admin.com — rol: noticias`)
  }

  const usuariosAusencias: NonNullable<Awaited<ReturnType<typeof crearUsuario>>>[] = []
  for (let i = 1; i <= 5; i++) {
    const u = await crearUsuario(`Editor Ausencias ${i}`, `ausencias${i}@admin.com`, "abc123456", "ausencias")
    usuariosAusencias.push(u!)
    console.log(`  ✅ ausencias${i}@admin.com — rol: ausencias`)
  }

  const usuariosEventos: NonNullable<Awaited<ReturnType<typeof crearUsuario>>>[] = []
  for (let i = 1; i <= 5; i++) {
    const u = await crearUsuario(`Editor Eventos ${i}`, `eventos${i}@admin.com`, "abc123456", "eventos")
    usuariosEventos.push(u!)
    console.log(`  ✅ eventos${i}@admin.com — rol: eventos`)
  }

  for (let i = 1; i <= 5; i++) {
    await crearUsuario(`Usuario ${i}`, `user${i}@user.com`, "abc123456")
    console.log(`  ✅ user${i}@user.com — rol: ninguno`)
  }

  console.log()

  // ─── Login como admin via HTTP ───────────────────────────────────────────

  console.log("🔑 Iniciando sesion como root...")
  const cookie = await loginHTTP("root@admin.com", "abc123456")
  console.log("  ✅ Sesion iniciada\n")

  // ─── Noticias vencidas (mas de 24 horas) via HTTP ────────────────────────

  console.log("📰 Creando noticias vencidas via HTTP...")

  for (let i = 1; i <= 5; i++) {
    const imagen = imagenesDisponibles[(i - 1) % imagenesDisponibles.length]
    const imagenPath = imagen ? path.join(carpetaScripts, imagen) : undefined
    const fechaVencida = new Date(Date.now() - (25 + i) * 60 * 60 * 1000)

    const json = await publicarNoticiaHTTP(
      cookie,
      `Noticia vencida ${i}`,
      `Esta noticia fue publicada hace mas de 24 horas (noticia ${i})`,
      imagenPath,
      fechaVencida
    )

    console.log(`  ✅ Noticia vencida ${i} — id: ${json.noticias?.[0]?.id}${imagen ? ` — imagen: ${imagen}` : ""}`)
  }

  console.log()

  // ─── Noticias recientes (2 horas atras) via HTTP ─────────────────────────

  console.log("📰 Creando noticias recientes via HTTP...")

  for (let i = 1; i <= 5; i++) {
    const imagen = imagenesDisponibles[(i + 4) % imagenesDisponibles.length]
    const imagenPath = imagen ? path.join(carpetaScripts, imagen) : undefined
    const fechaReciente = new Date(Date.now() - 2 * 60 * 60 * 1000)

    const json = await publicarNoticiaHTTP(
      cookie,
      `Noticia reciente ${i}`,
      `Esta noticia fue publicada hace 2 horas (noticia ${i})`,
      imagenPath,
      fechaReciente
    )

    console.log(`  ✅ Noticia reciente ${i} — id: ${json.noticias?.[0]?.id}${imagen ? ` — imagen: ${imagen}` : ""}`)
  }

  console.log()

  // ─── Ausencias ───────────────────────────────────────────────────────────

  console.log("🏫 Creando ausencias...")

  const materias = ["Matematica", "Historia", "Biologia", "Fisica", "Literatura"]

  for (let i = 0; i < 5; i++) {
    const ausencia = await prisma.ausencia.create({
      data: {
        materia: materias[i],
        docenteId: usuariosNoticias[i].id,
        publicadorId: usuariosAusencias[i].id,
      }
    })
    console.log(`  ✅ Ausencia ${ausencia.id} — ${materias[i]}`)
  }

  console.log()

  // ─── Eventos ─────────────────────────────────────────────────────────────

  console.log("📅 Creando eventos...")

  const eventosData = [
    { nombre: "Feria de ciencias", dias: 5, descripcion: "Exposición de proyectos científicos de los estudiantes" },
    { nombre: "Olimpiadas escolares", dias: 10, descripcion: "Competencia deportiva entre cursos del instituto" },
    { nombre: "Acto de graduacion", dias: 20, descripcion: "Ceremonia de egreso para los estudiantes de último año" },
    { nombre: "Dia del estudiante", dias: 30, descripcion: "Celebración y actividades recreativas para todos los alumnos" },
    { nombre: "Expo proyectos", dias: 45, descripcion: "Muestra de proyectos finales de las distintas carreras" },
  ]

  for (let i = 0; i < 5; i++) {
    const fecha = new Date(Date.now() + eventosData[i].dias * 24 * 60 * 60 * 1000)

    const evento = await prisma.eventos.create({
      data: {
        nombre: eventosData[i].nombre,
        descripcion: eventosData[i].descripcion,
        fecha,
        userId: usuariosEventos[i].id,
      }
    })
    console.log(`  ✅ Evento ${evento.id} — ${eventosData[i].nombre}`)
  }

  console.log()
  console.log("🎉 Seed completado")

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  prisma.$disconnect()
  process.exit(1)
})