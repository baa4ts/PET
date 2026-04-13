Aplicar cambios luego de instalar algun plugin de better auth

# Generar cambios en el esquema de prisma
> pnpm dlx auth@latest generate --config src/configuracion/Auth.ts

# Aplicar los cambios a la base de datos
> pnpm dlx prisma db push