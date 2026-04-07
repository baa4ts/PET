export const SETeventos: Eventos = [
    {
        nombre: "Fiesta",
        descripcion: "Una fiesta",
        fecha: new Date("2025-06-01"),
        id: 1,
        usuario: null,
    },
    {
        nombre: "Concierto",
        descripcion: "Un concierto de rock",
        fecha: new Date("2025-07-15"),
        id: 2,
        usuario: null,
    },
    {
        nombre: "Conferencia",
        descripcion: "Una conferencia de tecnologia",
        fecha: new Date("2025-08-20"),
        id: 3,
        usuario: null,
    },
    {
        nombre: "Conferencia 2",
        descripcion: "Una conferencia de tecnologia",
        fecha: new Date("2025-08-20"),
        id: 4,
        usuario: null,
    },
]

export const SETnoticias: Noticias = [
    {
        id: 1,
        titulo: "Nuevo parque inaugurado en la ciudad",
        descripcion: "Las autoridades inauguraron un parque con areas verdes y juegos infantiles.",
        recursos: [{ resource: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800" }],
    },
    {
        id: 2,
        titulo: "Temperaturas record este verano",
        descripcion: "Meteorologos reportan las temperaturas mas altas en decadas.",
        recursos: [{ resource: "https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=800" }],
    },
    {
        id: 3,
        titulo: "Lanzamiento de nueva aplicacion local",
        descripcion: "Una startup lanzo una app para conectar vecinos del barrio.",
        recursos: [{ resource: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800" }],
    },
    {
        id: 4,
        titulo: "Festival de musica este fin de semana",
        descripcion: "Mas de 20 bandas se presentaran en el festival anual de la ciudad.",
        recursos: [{ resource: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800" }],
    },
    {
        id: 5,
        titulo: "Mejoras en el transporte publico",
        descripcion: "El gobierno anuncio nuevas rutas y horarios extendidos para los autobuses.",
        recursos: [{ resource: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800" }],
    },
];

export const SETausencias: Ausencias = [
    {
        materia: "Matematicas",
        usuario: { primer_nombre: "Juan", primer_apellido: "Garcia" },
    },
    {
        materia: "Historia",
        usuario: { primer_nombre: "Maria", primer_apellido: "Lopez" },
    },
    {
        materia: "Fisica",
        usuario: { primer_nombre: "Carlos", primer_apellido: "Martinez" },
    },
    {
        materia: "Quimica",
        usuario: { primer_nombre: "Ana", primer_apellido: "Rodriguez" },
    },
    {
        materia: "Biologia",
        usuario: { primer_nombre: "Luis", primer_apellido: "Perez" },
    },
];