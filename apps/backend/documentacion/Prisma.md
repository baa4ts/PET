Aplicar cambios en la base de datos

# Aplicar cambios del schema a la base de datos (desarrollo)
> pnpm dlx prisma db push

# Aplicar cambios con historial de migraciones (produccion)
> pnpm dlx prisma migrate dev --name <nombre>

# Regenerar el cliente de prisma
> pnpm dlx prisma generate


pnpx prisma generate
pnpx prisma migrate deploy
pnpm tsx scripts/seed.ts
pnpm dev