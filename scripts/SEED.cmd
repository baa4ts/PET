@echo off
set BEARER=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZWR1bGEiOiIxMjM0NTY3OCIsImlhdCI6MTc3NTU4NzU2OSwiZXhwIjoxNzc1NTkxMTY5fQ.AIcUiTgZr6UXzvyGwDaKICwDo2GmU0xy2tzVNuH1X9Q
set BASE_URL=http://localhost:3000/api/v1
set FILE=img.png

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
-d "{\"cedula\":\"12345678\",\"materia\":\"Matematica\"}"

curl -X POST %BASE_URL%/ausencias ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"cedula\":\"12345678\",\"materia\":\"Historia\"}"

curl -X POST %BASE_URL%/ausencias ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"cedula\":\"12345678\",\"materia\":\"Fisica\"}"

curl -X POST %BASE_URL%/ausencias ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"cedula\":\"12345678\",\"materia\":\"Quimica\"}"

curl -X POST %BASE_URL%/ausencias ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"cedula\":\"12345678\",\"materia\":\"Biologia\"}"

curl -X POST %BASE_URL%/ausencias ^
-H "Content-Type: application/json" ^
-H "Authorization: Bearer %BEARER%" ^
-d "{\"cedula\":\"12345678\",\"materia\":\"Geografia\"}"

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