```bash
curl -X POST http://localhost:3000/api/v1/testing \
  -F "files=@\"C:\Users\baa4t\OneDrive\Imágenes\Screenshots\Captura de pantalla 2026-04-03 135335.png\"" \
  -F "files=@\"C:\Users\baa4t\OneDrive\Imágenes\Screenshots\Captura de pantalla 2026-04-03 180339.png\""
```

```bash
curl -X POST http://localhost:3000/api/v1/testing -F "files=@\"C:\Users\baa4t\OneDrive\Imágenes\Screenshots\Captura de pantalla 2026-04-03 135335.png\"" -F "files=@\"C:\Users\baa4t\OneDrive\Imágenes\Screenshots\Captura de pantalla 2026-04-03 180339.png\""
```

```bash
curl -X POST http://localhost:3000/api/v1/testing -F "files=@\"C:\Users\baa4t\OneDrive\Imágenes\Screenshots\Captura de pantalla 2026-04-03 135335.png\"" -F "files=@\"C:\Users\baa4t\OneDrive\Imágenes\Screenshots\Captura de pantalla 2026-04-03 180339.png\"" -F "titulo=Mi titulo de prueba" -F "descripcion=Mi descripcion de prueba"
```
