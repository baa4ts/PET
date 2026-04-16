@echo off
pushd apps\backend
echo Instalando backend...

:: Instalar dependencias
call pnpm install
call pnpm approve-builds --all

:: Migraciones
call pnpm prisma generate
call pnpm prisma migrate dev --name init

:: Iniciar el servidor backend
start "Backend" cmd /k "pnpm run dev"

:: Esperar y hacer seed
echo Esperando 15 segundos por seguridad...
timeout /t 15 /nobreak
call pnpm tsx scripts/seed.ts

popd

echo Esperando 15 segundos antes de iniciar frontend...
timeout /t 15 /nobreak

pushd apps\frontend
echo Instalando frontend...

:: Instalar dependencias
call pnpm install
call pnpm approve-builds --all

:: Iniciar el servidor frontend
start "Frontend" cmd /k "pnpm run dev"

popd

echo Listo!
timeout /t 3 /nobreak
taskkill /F /IM cmd.exe