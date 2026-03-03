# Sesión 4: Middlewares en Express y Desarrollo Frontend con Astro

**fecha**: 2 de marzo de 2026

## 📋 Resumen de la Sesión

Esta sesión tiene dos grandes bloques:

1. **Middlewares en Express**: se introduce el concepto de middleware, su anatomía y cómo se pueden aplicar tanto a nivel global (`app.use`) como a nivel de ruta. El proyecto backend incorpora middlewares de terceros (`morgan`, `express-rate-limit`, `cors`) y un middleware propio (`verificarArtista`) que centraliza la validación de existencia de un artista.

2. **Introducción al desarrollo frontend profesional con Astro**: se presenta Astro como framework de frontend orientado al contenido, se integra Tailwind CSS y se construye un frontend básico que consume la API REST creada en el backend.

---

## 🔧 Proyecto Backend — `PI2-2526-spotify-wip`

**Repositorio**: [https://github.com/yurigo/PI2-2526-spotify-wip](https://github.com/yurigo/PI2-2526-spotify-wip)

### Estructura

```
PI2-2526-spotify-wip/
├── package.json
├── table-creation.sql      ← esquema de la base de datos
├── db.sqlite               ← base de datos SQLite
└── src/
    ├── app.js              ← capa de presentación (rutas + middlewares)
    ├── controller.js       ← capa de lógica de negocio
    ├── middlewares.js      ← middlewares personalizados
    ├── artists.dao.js      ← DAO de artistas (SQLite)
    ├── songs.dao.js        ← DAO de canciones (SQLite)
    ├── artists.js          ← datos de artistas (legado)
    └── songs.js            ← datos de canciones (legado)
```

### Dependencias

```json
{
  "dependencies": {
    "better-sqlite3": "^12.6.2",
    "chalk": "^5.6.2",
    "cors": "^2.8.6",
    "express": "^5.2.1",
    "express-rate-limit": "^8.2.1",
    "morgan": "^1.10.1",
    "nanoid": "^5.1.6"
  },
  "devDependencies": {
    "nodemon": "^3.1.11"
  }
}
```

Respecto a la sesión anterior se añaden `morgan` (log de peticiones HTTP) y `express-rate-limit` (limitación de tasa de peticiones).

---

## 🧩 Middlewares en Express

### Anatomía de un middleware

Un middleware en Express es una función que recibe tres parámetros: el objeto `req` (petición), el objeto `res` (respuesta) y la función `next` (siguiente middleware en la cadena):

```javascript
const m = (req, res, next) => {
    // hacer algo con la petición o la respuesta

    next(); // pasar al siguiente middleware o al handler final
}
```

Si no se llama a `next()`, la petición queda "colgada" y el cliente nunca recibe respuesta. Si se llama a `res.send()` o `res.json()` sin llamar a `next()`, se corta la cadena y se responde al cliente directamente.

### Tipos de aplicación

#### 1. Middleware global (`app.use`)

Se aplica a **todas** las peticiones, independientemente de la ruta o el método HTTP:

```javascript
app.use(cors());              // habilita CORS
app.use(express.json());      // parsea el body como JSON
app.use(morgan("tiny"));      // log de peticiones en consola
app.use(limiter);             // limita la tasa de peticiones
```

#### 2. Middleware a nivel de ruta

Se aplica **solo** a una ruta concreta, pasándolo como argumento entre la ruta y el handler:

```javascript
app.get("/artists/:idArtist", verificarArtista, getArtistByID);
app.put("/artists/:idArtist", verificarArtista, updateArtist);
app.delete("/artists/:idArtist", verificarArtista, deleteArtist);
```

> ⚠️ En esta sesión **no** se explican los *route-level middlewares* con `express.Router()`.

### Middleware personalizado: `verificarArtista`

El middleware `verificarArtista` centraliza la validación de existencia de un artista antes de ejecutar cualquier operación sobre él:

```javascript
// src/middlewares.js
import * as artistsDao from "./artists.dao.js";

export function verificarArtista(req, res, next) {
    const idArtist = Number(req.params.idArtist);
    const found = artistsDao.findArtistById(idArtist);

    if (!found) {
        return res.status(404).json({ error: "Artista no encontrado" });
    }

    next();
}
```

Gracias a este middleware, los handlers del controlador ya no necesitan comprobar si el artista existe: si `verificarArtista` llama a `next()`, significa que el artista existe.

### Middleware de terceros utilizados

| Middleware | Paquete | Descripción |
|---|---|---|
| CORS | `cors` | Habilita peticiones desde cualquier origen |
| JSON body parser | `express` (built-in) | Parsea el cuerpo de la petición como JSON |
| Logger | `morgan` | Registra cada petición en la consola en formato `tiny` |
| Rate limiter | `express-rate-limit` | Limita a 100 peticiones por IP cada 1 minuto |

### Configuración del rate limiter

```javascript
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // ventana de 1 minuto
    limit: 100,               // máximo 100 peticiones por IP
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
});

app.use(limiter);
```

---

## 📁 Estructura de `app.js` con middlewares

```javascript
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from 'express-rate-limit';
import { verificarArtista } from "./middlewares.js";
import { /* handlers */ } from "./controller.js";

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(limiter);

// Rutas con middleware a nivel de ruta
app.get("/artists/:idArtist",          verificarArtista, getArtistByID);
app.put("/artists/:idArtist",          verificarArtista, updateArtist);
app.delete("/artists/:idArtist",       verificarArtista, deleteArtist);
app.get("/artists/:idArtist/songs",    verificarArtista, getSongsFromArtist);
// ...
```

---

## 🎵 DAO de Canciones — `songs.dao.js` (migrado a SQLite)

En esta sesión, el DAO de canciones ha sido completamente migrado a SQLite, completando la tarea pendiente de la sesión anterior:

```javascript
// songs.dao.js — operaciones con SQLite
import Database from "better-sqlite3";

const db = new Database("db.sqlite");

export function findArtistSongsListById(artistId) {
    const stmt = db.prepare("SELECT * FROM songs WHERE idArtist = ?");
    return stmt.all(artistId);
}

export function createSongForArtist(songData, artistId) {
    const stmt = db.prepare(
        "INSERT INTO songs (name, duration, idArtist) VALUES (?, ?, ?)"
    );
    const { lastInsertRowid } = stmt.run(songData.name, songData.duration, artistId);
    return lastInsertRowid;
}

export function updateSong(idArtist, idSong, newSongData) {
    const stmt = db.prepare(
        "UPDATE songs SET name = ?, duration = ? WHERE id = ? AND idArtist = ?"
    );
    return stmt.run(newSongData.name, newSongData.duration, idSong, idArtist);
}

export function deleteSong(idArtist, idSong) {
    const stmt = db.prepare(
        "DELETE FROM songs AS s WHERE s.id = ? AND s.idArtist = ?"
    );
    return stmt.run(idSong, idArtist);
}
```

---

## 🌐 Proyecto Frontend — `PI2-2526-astro-wip`

**Repositorio**: [https://github.com/yurigo/PI2-2526-astro-wip](https://github.com/yurigo/PI2-2526-astro-wip)

### Creación del proyecto

```bash
npm create astro@latest
```

### Instalación de Tailwind CSS

```bash
npm i tailwindcss @tailwindcss/vite
```

### Estructura

```
PI2-2526-astro-wip/
├── astro.config.mjs         ← configuración de Astro (Tailwind como plugin Vite)
├── package.json
└── src/
    ├── assets/              ← imágenes y recursos estáticos
    ├── components/          ← componentes reutilizables (.astro)
    │   ├── Artist.astro     ← tarjeta de un artista
    │   ├── Artists.astro    ← lista de artistas (fetch a la API)
    │   ├── Footer.astro     ← pie de página
    │   ├── Header.astro     ← cabecera
    │   └── Introduction.astro
    ├── layouts/
    │   └── Layout.astro     ← layout base (HTML, Header, Footer, slot)
    ├── pages/
    │   ├── index.astro      ← página principal
    │   └── pagina2.astro    ← segunda página de ejemplo
    └── styles/
        └── global.css       ← estilos globales (Tailwind)
```

### Dependencias

```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.2.1",
    "astro": "^5.17.1",
    "tailwindcss": "^4.2.1"
  }
}
```

### Configuración de Tailwind en Astro

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

Tailwind se integra como plugin de Vite, el bundler interno de Astro, en lugar de como plugin propio de Astro.

---

## 🏗️ Arquitectura del Frontend

### Layout base — `Layout.astro`

El layout base envuelve todas las páginas con la estructura HTML común, incluyendo el `<Header>`, el `<Footer>` y un `<slot />` donde se inyecta el contenido de cada página:

```astro
---
import "../styles/global.css";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
---
<!doctype html>
<html lang="en">
  <head><!-- meta, title, favicon --></head>
  <body>
    <Header>Pepito</Header>
    <main class="min-h-dvh">
      <slot />   <!-- aquí se inyecta el contenido de cada página -->
    </main>
    <Footer></Footer>
  </body>
</html>
```

### Página principal — `index.astro`

```astro
---
import Layout from '../layouts/Layout.astro';
import Introduction from '../components/Introduction.astro';
import Artists from '../components/Artists.astro';
---

<Layout>
  <Introduction />
  <Artists />
</Layout>
```

### Componente `Artists.astro` — consumo de la API

El componente realiza un `fetch` a la API Express en tiempo de construcción (SSG) o en el servidor (SSR), obtiene los artistas y los renderiza usando el componente `Artist`:

```astro
---
import Artist from "../components/Artist.astro";

const response = await fetch("http://localhost:3000/artists");
const artists = await response.json();
---
<section class="p-4 m-auto max-w-[800px]">
  <h2 class="text-3xl mb-5">Artists</h2>
  <div class="flex flex-row flex-wrap gap-3">
    { artists.map(artista => <Artist name={artista.name} />) }
  </div>
</section>
```

### Componente `Artist.astro` — props y Tailwind

```astro
---
const { name } = Astro.props;
---
<div class="border max-w-[180px] rounded-2xl p-4 bg-pink-300">
  <h2 class="text-2xl mb-2">{name}</h2>
  <p>Lorem ipsum dolor sit amet.</p>
</div>
```

Puntos clave:
- Las props se reciben con `Astro.props` y se desestructuran en el frontmatter (`---`).
- Los estilos se aplican directamente con clases de Tailwind.

---

## 🔗 Integración Frontend ↔ Backend

La arquitectura completa de la sesión conecta el frontend Astro con el backend Express:

```
Navegador
   │
   ▼
Astro (puerto 4321)           Express (puerto 3000)
┌──────────────────┐          ┌─────────────────────────────┐
│  Layout.astro    │          │  app.js (rutas + middlewares)│
│  Artists.astro ──┼─ fetch ──┤  controller.js (lógica)     │
│  Artist.astro    │          │  artists.dao.js (SQLite)     │
└──────────────────┘          │  songs.dao.js (SQLite)       │
                              └─────────────────────────────┘
```

---

## 💡 Conceptos clave

### Middleware

> Un middleware es una función que se ejecuta entre la recepción de la petición y el envío de la respuesta. Puede modificar `req` y `res`, ejecutar código, y decidir si pasar al siguiente middleware (`next()`) o cortar la cadena respondiendo directamente.

### Astro

> Astro es un framework de frontend orientado al contenido que genera HTML estático por defecto. Los componentes `.astro` tienen un frontmatter JavaScript (entre `---`) que se ejecuta en el servidor o en tiempo de build, y una plantilla HTML que se convierte en markup estático.

### Tailwind CSS

> Tailwind es un framework CSS de utilidades. En lugar de escribir clases semánticas como `.card`, se aplican clases de utilidad directamente en el HTML: `rounded-2xl`, `p-4`, `text-3xl`, etc.

---

## 📊 Comparativa Backend vs Frontend

| Aspecto | Backend (Express) | Frontend (Astro) |
|---|---|---|
| Lenguaje | JavaScript (Node.js) | JavaScript / HTML |
| Framework | Express 5 | Astro 5 |
| Puerto | 3000 | 4321 |
| Persistencia | SQLite (better-sqlite3) | No (consume la API) |
| Estilos | — | Tailwind CSS |
| Arranque | `npm run dev` (nodemon) | `npm run dev` |

