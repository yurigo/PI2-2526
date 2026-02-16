# Actividad: Spotify API REST - Artistas y Canciones (rutas anidadas)

**Deadline**: 22 de febrero de 2026 a las 23:59

## Contexto

En la sesión anterior se ha implementado una API REST con Express (CRUD) siguiendo el ejemplo de TODOs.

En esta actividad se pide crear una nueva API REST para gestionar **artistas** y sus **canciones**, aplicando el concepto de **rutas anidadas**.

En esta API **NO existe** `/songs` como recurso accesible directamente.  
Las canciones solo se pueden consultar y gestionar **a través del artista**.

---

## Objetivo

Crear un servicio REST con **Node.js + Express** que permita:

- Gestionar **artistas** (CRUD)
- Gestionar **canciones de un artista** mediante rutas anidadas (CRUD)
- Validar datos y responder con **status codes** coherentes
- Persistencia **en memoria** (arrays), sin base de datos

---

## Modelo de datos

### Artista

- `id` (number)
- `name` (string)

Ejemplo:

```json
{ "id": 44, "name": "Daft Punk" }
```

### Canción

- `id` (number)
- `name` (string)
- `duration` (number) → segundos

**Importante:** en el modelo puede existir internamente `idArtist`, pero **a nivel de API** la relación la define la ruta (`/artists/:idArtist/...`).

Ejemplo:

```json
{ "id": 3, "name": "One More Time", "duration": 320 }
```

---

## Requisitos generales

- Express (estructura similar al proyecto de TODOs)
- Datos en memoria (arrays)
- Respuestas en JSON
- Script para arrancar (por ejemplo `npm start`)
- Se recomienda incluir datos iniciales para probar la API

---

## Endpoints obligatorios

### 1) Artistas (CRUD)

- `GET /artists`
- `GET /artists/:idArtist`
- `POST /artists`
  - Body: `{ "name": "..." }`
  - Respuesta: `201`
- `PUT /artists/:idArtist`
  - Body: `{ "name": "..." }`
- `DELETE /artists/:idArtist`

Si el artista no existe: `404`.

---

### 2) Canciones de un artista (CRUD anidado)

⚠️ **No puede existir** `GET /songs`, `POST /songs`, etc.

El CRUD de canciones debe ser exactamente:

- `GET /artists/:idArtist/songs`
  - Devuelve todas las canciones del artista
  - Si el artista no existe: `404`

- `GET /artists/:idArtist/songs/:idSong`
  - Devuelve una canción concreta del artista
  - Si el artista no existe: `404`
  - Si la canción no existe dentro de ese artista: `404`

- `POST /artists/:idArtist/songs`
  - Crea una canción para ese artista
  - Body:
    - `name` (obligatorio)
    - `duration` (obligatorio, número > 0)
  - Si el artista no existe: `404`
  - Si faltan campos o son inválidos: `400`
  - Respuesta: `201` + canción creada

- `PUT /artists/:idArtist/songs/:idSong`
  - Actualiza la canción de ese artista
  - Body:
    - `name` (obligatorio)
    - `duration` (obligatorio, número > 0)
  - Si el artista no existe: `404`
  - Si la canción no existe dentro de ese artista: `404`
  - Si body inválido: `400`

- `DELETE /artists/:idArtist/songs/:idSong`
  - Si el artista no existe: `404`
  - Si la canción no existe dentro de ese artista: `404`

---

## Reglas de validación mínima

- Los parámetros `:idArtist` y `:idSong` deben tratarse como números:
  - Si no es número válido → `400`

- En `POST` y `PUT` de canciones:
  - `name` obligatorio (string no vacío) → si no, `400`
  - `duration` obligatorio y > 0 → si no, `400`

---

## Reglas de coherencia importantes

- Una canción solo puede "existir" dentro del artista de la ruta.
- Si se pide `/artists/44/songs/7`, **no vale** devolver una canción 7 que pertenezca a otro artista.
- `GET /artists/:idArtist/songs` debe devolver **solo** las canciones de ese artista.

---

## Extras opcionales (bonus)

Implementar al menos uno:

1. Generación de IDs robusta (por ejemplo, evitar colisiones aunque se borren canciones)

2. Filtro:
   - `GET /artists/:idArtist/songs?minDuration=200`

3. Ordenación:
   - `GET /artists/:idArtist/songs?sort=duration` o `sort=name`

4. Al devolver un artista (`GET /artists/:idArtist`), incluir también el número de canciones (`songsCount`)

---

## Entrega

Debe incluir:

- Código fuente + `package.json`
- README con:
  - cómo arrancar el servidor
  - lista de endpoints
  - screenshots de pruebas (curl / Thunder Client / Postman), mínimo:
    - 1 POST artista
    - 1 POST canción para un artista
    - 1 GET songs de un artista
    - 1 PUT song
    - 1 DELETE song
