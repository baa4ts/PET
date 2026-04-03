## Crear usuario

```json
POST /api/v1/usuarios/register
Content-Type: application/json

{
  "cedula": "12345678",
  "primer_nombre": "Juan",
  "primer_apellido": "Perez",
  "email": "juan@gmail.com",
  "password": "12345678"
}
```

## Crear usuario que ya existe

```json
POST /api/v1/usuarios/register
Content-Type: application/json

{
  "cedula": "12345678",
  "primer_nombre": "Juan",
  "primer_apellido": "Perez",
  "email": "juan@gmail.com",
  "password": "12345678"
}
```

## Login válido

```json
POST /api/v1/usuarios/login
Content-Type: application/json

{
  "cedula": "12345678",
  "password": "12345678"
}
```

## Login inválido

```json
POST /api/v1/usuarios/login
Content-Type: application/json

{
  "cedula": "12345678",
  "password": "wrongpassword"
}
```