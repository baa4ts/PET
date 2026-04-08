@echo off
set BEARER=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZWR1bGEiOiIxMjM0NTY3OCIsImlhdCI6MTc3NTYxMTg5NiwiZXhwIjoxNzc1NjE1NDk2fQ.KtDL3Ah69c-S7G-KUmfOcwLeE_3nVtDMz5IyTAjPFHI
set BASE_URL=http://localhost:3000/api/v1
set FILE=img.png

curl -X POST %BASE_URL%/usuarios/register ^
-H "Content-Type: application/json" ^
-d "{\"cedula\":\"10000001\",\"primer_nombre\":\"Juan\",\"segundo_nombre\":\"Carlos\",\"primer_apellido\":\"Perez\",\"segundo_apellido\":\"Lopez\",\"email\":\"juan1@example.com\",\"telefono\":\"099111111\",\"password\":\"password123\"}"

curl -X POST %BASE_URL%/usuarios/register ^
-H "Content-Type: application/json" ^
-d "{\"cedula\":\"10000002\",\"primer_nombre\":\"Maria\",\"segundo_nombre\":\"Elena\",\"primer_apellido\":\"Gomez\",\"segundo_apellido\":\"Fernandez\",\"email\":\"maria2@example.com\",\"telefono\":\"099222222\",\"password\":\"password123\"}"

curl -X POST %BASE_URL%/usuarios/register ^
-H "Content-Type: application/json" ^
-d "{\"cedula\":\"10000003\",\"primer_nombre\":\"Luis\",\"segundo_nombre\":\"Alberto\",\"primer_apellido\":\"Rodriguez\",\"segundo_apellido\":\"Sosa\",\"email\":\"luis3@example.com\",\"telefono\":\"099333333\",\"password\":\"password123\"}"

curl -X POST %BASE_URL%/usuarios/register ^
-H "Content-Type: application/json" ^
-d "{\"cedula\":\"10000004\",\"primer_nombre\":\"Ana\",\"segundo_nombre\":\"Beatriz\",\"primer_apellido\":\"Martinez\",\"segundo_apellido\":\"Diaz\",\"email\":\"ana4@example.com\",\"telefono\":\"099444444\",\"password\":\"password123\"}"

curl -X POST %BASE_URL%/usuarios/register ^
-H "Content-Type: application/json" ^
-d "{\"cedula\":\"10000005\",\"primer_nombre\":\"Pedro\",\"segundo_nombre\":\"Jose\",\"primer_apellido\":\"Silva\",\"segundo_apellido\":\"Ruiz\",\"email\":\"pedro5@example.com\",\"telefono\":\"099555555\",\"password\":\"password123\"}"

curl -X POST %BASE_URL%/usuarios/register ^
-H "Content-Type: application/json" ^
-d "{\"cedula\":\"10000006\",\"primer_nombre\":\"Lucia\",\"segundo_nombre\":\"Mariana\",\"primer_apellido\":\"Torres\",\"segundo_apellido\":\"Vega\",\"email\":\"lucia6@example.com\",\"telefono\":\"099666666\",\"password\":\"password123\"}"

echo === CREANDO NOTICIAS ===

curl -X POST %BASE_URL%/noticias ^
-H "Authorization: Bearer %BEARER%" ^
-F "recurso=@%FILE%" ^
-F "titulo=Noticia 1" ^
-F "descripcion=Descripcion inventada 1"

curl -X POST %BASE_URL%/noticias ^
-H "Authorization: Bearer %BEARER%" ^
-F "recurso=@%FILE%" ^
-F "titulo=Noticia 2" ^
-F "descripcion=Descripcion inventada 2"

curl -X POST %BASE_URL%/noticias ^
-H "Authorization: Bearer %BEARER%" ^
-F "recurso=@%FILE%" ^
-F "titulo=Noticia 3" ^
-F "descripcion=Descripcion inventada 3"

curl -X POST %BASE_URL%/noticias ^
-H "Authorization: Bearer %BEARER%" ^
-F "recurso=@%FILE%" ^
-F "titulo=Noticia 4" ^
-F "descripcion=Descripcion inventada 4"

curl -X POST %BASE_URL%/noticias ^
-H "Authorization: Bearer %BEARER%" ^
-F "recurso=@%FILE%" ^
-F "titulo=Noticia 5" ^
-F "descripcion=Descripcion inventada 5"

curl -X POST %BASE_URL%/noticias ^
-H "Authorization: Bearer %BEARER%" ^
-F "recurso=@%FILE%" ^
-F "titulo=Noticia 6" ^
-F "descripcion=Descripcion inventada 6"

echo === CREANDO AUSENCIAS ===

curl -X POST %BASE_URL%/ausencias ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"cedula\":\"10000001\",\"materia\":\"Matematica\"}"

curl -X POST %BASE_URL%/ausencias ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"cedula\":\"10000002\",\"materia\":\"Historia\"}"

curl -X POST %BASE_URL%/ausencias ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"cedula\":\"10000003\",\"materia\":\"Fisica\"}"

curl -X POST %BASE_URL%/ausencias ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"cedula\":\"10000003\",\"materia\":\"Quimica\"}"

curl -X POST %BASE_URL%/ausencias ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"cedula\":\"10000005\",\"materia\":\"Biologia\"}"

curl -X POST %BASE_URL%/ausencias ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"cedula\":\"10000006\",\"materia\":\"Geografia\"}"

echo === CREANDO EVENTOS ===

curl -X POST %BASE_URL%/eventos ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"nombre\":\"Reunion general\",\"descripcion\":\"Encuentro institucional\",\"fecha\":\"2026-04-10T10:00:00.000Z\"}"

curl -X POST %BASE_URL%/eventos ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"nombre\":\"Charla tecnica\",\"descripcion\":\"Introduccion a Node\",\"fecha\":\"2026-04-11T15:30:00.000Z\"}"

curl -X POST %BASE_URL%/eventos ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"nombre\":\"Taller React\",\"descripcion\":\"Hooks avanzados\",\"fecha\":\"2026-04-12T18:00:00.000Z\"}"

curl -X POST %BASE_URL%/eventos ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"nombre\":\"Examen parcial\",\"descripcion\":\"Evaluacion semestre\",\"fecha\":\"2026-04-15T08:00:00.000Z\"}"

curl -X POST %BASE_URL%/eventos ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"nombre\":\"Feria ciencia\",\"descripcion\":\"Proyectos estudiantiles\",\"fecha\":\"2026-04-18T12:00:00.000Z\"}"

curl -X POST %BASE_URL%/eventos ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"nombre\":\"Cierre curso\",\"descripcion\":\"Entrega final\",\"fecha\":\"2026-04-20T20:00:00.000Z\"}"

echo === LISTO ===
pause