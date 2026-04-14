@echo off
start "Backend" cmd /k "cd apps\backend && pnpm run dev"
start "Frontend" cmd /k "cd apps\frontend && pnpm run dev"
echo Listo!
timeout /t 3 /nobreak
exit