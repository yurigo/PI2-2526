# Sesión 3: Arquitectura en Capas y Persistencia con SQLite

**fecha**: 23 de febrero de 2026

## 📋 Resumen de la Sesión

En esta sesión se ha corregido en clase un ejercicio entregado por un estudiante. Partiendo del proyecto original (`from`) se ha refactorizado el código hasta llegar a la versión corregida (`to`), aplicando principios de arquitectura en capas y sustituyendo la persistencia en memoria por una base de datos SQLite.

### Conceptos clave tratados:

- **Separación de capas**: app (presentación) → controller (lógica de negocio) → DAO (acceso a datos)
- **Problema del acoplamiento**: cuando todo el código está en un único módulo, cualquier cambio de tecnología (p.ej. de JSON en memoria a SQL) obliga a modificar todo el código a la vez.
- **Persistencia real**: sustitución del array en memoria por una base de datos SQLite con `better-sqlite3`.
- **SQL básico**: creación de tablas, consultas `SELECT`, `INSERT`, `UPDATE`, `DELETE`, y uso de `LEFT JOIN` para obtener datos agregados.

---

## 📁 Proyecto `from` — Estado inicial (código del estudiante)

### Estructura

```
from/
├── package-lock.json
└── package.json   ← ⚠️ todo el código de la aplicación en un único archivo
```

> **Nota**: El código de la aplicación está en el fichero `package.json` (que en este caso contiene código JavaScript en lugar de la configuración JSON habitual). El nombre del fichero es en sí mismo un error del estudiante; en una aplicación normal este fichero sería `app.js` o `index.js`.

El proyecto `from` implementa toda la API REST en **un único archivo**, mezclando datos, lógica y rutas:

```javascript
// Todo en un único módulo: datos, lógica y rutas
import express from "express";

const app = express();

// Datos en memoria
let artists = [ ... ];
let songs = [ ... ];

// Funciones helper mezcladas con los datos
function findArtistById(id) { ... }
function findSongByArtist(songId, artistId) { ... }

// Rutas (presentación) mezcladas con lógica y acceso a datos
app.get("/artists", function(req, res) {
    res.json(artists);  // acceso directo al array
});

app.post("/artists", function(req, res) {
    const newArtist = req.body;
    const Maxid = artists.map((element) => element.id);
    const max = Math.max(...Maxid);
    newArtist.id = max + 1;
    artists.push(newArtist);
    res.status(201).send("");
});
// ... resto de endpoints
```

### Endpoints implementados en `from`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Página de inicio |
| GET | `/artists` | Listar todos los artistas |
| GET | `/artists/:idArtist` | Obtener artista por ID |
| POST | `/artists` | Crear artista |
| PUT | `/artists/:idArtist` | Actualizar artista |
| DELETE | `/artists/:idArtist` | Eliminar artista |
| GET | `/artists/:idArtist/songs` | Listar canciones de un artista |
| GET | `/artists/:idArtist/songs/:idSong` | Obtener canción concreta |
| POST | `/artists/:idArtist/songs` | Crear canción |
| PUT | `/artists/:idArtist/songs/:idSong` | Actualizar canción |
| DELETE | `/artists/:idArtist/songs/:idSong` | Eliminar canción |

### Dependencias del proyecto `from`

```json
{
  "dependencies": {
    "chalk": "^5.6.2",
    "cors": "^2.8.6",
    "express": "^5.2.1"
  }
}
```

### ⚠️ Problemas de diseño detectados

1. **Monolito sin capas**: presentación, lógica de negocio y acceso a datos están mezclados en un único archivo.
2. **Persistencia volátil**: los datos se pierden al reiniciar el servidor porque se guardan en arrays en memoria.
3. **Generación de IDs frágil**: `Math.max(...artists.map(e => e.id)) + 1` falla con arrays vacíos y no garantiza unicidad real. Además, la variable se llama `Maxid` (mezcla de mayúsculas no convencional; debería ser `maxId` siguiendo camelCase).
4. **Código difícil de escalar**: añadir una base de datos obligaría a reescribir todos los endpoints.
5. **Duplicación de lógica**: la validación de existencia del artista se repite en cada endpoint de canciones.

---

## 📁 Proyecto `to` — Estado final (código corregido)

### Estructura

```
to/
├── package.json
├── table-creation.sql     ← esquema de la base de datos
├── db.sqlite              ← base de datos SQLite
└── src/
    ├── app.js             ← capa de presentación (solo rutas)
    ├── controller.js      ← capa de lógica de negocio
    ├── artists.dao.js     ← capa de acceso a datos (artistas, SQLite)
    ├── artists.js         ← datos iniciales en memoria (legado)
    ├── songs.dao.js       ← capa de acceso a datos (canciones, pendiente de SQLite)
    └── songs.js           ← datos iniciales en memoria (legado)
```

### Dependencias del proyecto `to`

```json
{
  "dependencies": {
    "better-sqlite3": "^12.6.2",
    "chalk": "^5.6.2",
    "cors": "^2.8.6",
    "express": "^5.2.1",
    "nanoid": "^5.1.6"
  }
}
```

Se añade `better-sqlite3` para la persistencia con SQLite.

---

## 🏗️ Cambios de Arquitectura: `from` → `to`

### 1. Separación en capas

El cambio más importante es la división del código en tres capas con responsabilidades claramente diferenciadas:

```
from/                          to/
──────────────────────         ──────────────────────────────────────
package.json (todo)     →      src/app.js        (presentación)
                               src/controller.js  (lógica de negocio)
                               src/artists.dao.js (acceso a datos)
```

#### Capa de Presentación — `app.js`

```javascript
// app.js: SOLO define las rutas y delega en el controlador
import { welcome, getAllArtists, getArtistByID, createArtist, updateArtist, deleteArtist } from "./controller.js";

app.get("/", welcome);
app.get("/artists", getAllArtists);
app.get("/artists/:idArtist", getArtistByID);
app.post("/artists", createArtist);
app.put("/artists/:idArtist", updateArtist);
app.delete("/artists/:idArtist", deleteArtist);
```

> `app.js` no conoce nada sobre datos, validaciones ni lógica. Solo mapea rutas HTTP a funciones del controlador.

#### Capa de Lógica de Negocio — `controller.js`

```javascript
// controller.js: valida datos y orquesta las operaciones
import * as dao from "./artists.dao.js";

export function createArtist(req, res) {
    const newArtist = req.body;

    // validación de datos de entrada
    if (!newArtist.name || newArtist.name.trim() === "") {
        return res.status(400).json({ error: "Nombre requerido" });
    }

    // delega el acceso a datos en el DAO
    newArtist.id = dao.createArtist(newArtist);

    res.status(201).json(newArtist);
}
```

> El controlador no sabe cómo se guardan los datos (podría ser memoria, SQLite o MongoDB). Solo sabe qué operaciones pedir al DAO.

#### Capa de Acceso a Datos — `artists.dao.js`

```javascript
// artists.dao.js: solo habla con la base de datos
import Database from 'better-sqlite3';

const db = new Database('db.sqlite');

export function createArtist(artist) {
    const stmt = db.prepare("INSERT INTO artists (name) VALUES (?)");
    const { lastInsertRowid } = stmt.run(artist.name);
    return lastInsertRowid;
}

export function updateArtist(id, newArtist) {
    const stmt = db.prepare("UPDATE artists SET name = ? WHERE id = ?");
    const data = stmt.run(newArtist.name, id);
    return data.changes > 0;
}

export const deleteArtist = (id) => {
    const stmt = db.prepare("DELETE FROM artists WHERE id = ?");
    const data = stmt.run(id);
    return data.changes > 0;
}
```

> El DAO no conoce HTTP, ni Express, ni la lógica de negocio. Solo realiza operaciones SQL.

---

### 2. Persistencia en base de datos SQLite

#### En `from`: datos en memoria (volátiles)

```javascript
let artists = [
    {id: 1, name: "Kanye West"},
    {id: 2, name: "Dave"},
    // ...
];
```

Los datos desaparecen al reiniciar el servidor.

#### En `to`: base de datos SQLite (persistente)

```sql
-- table-creation.sql
CREATE TABLE artists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);

CREATE TABLE songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    duration INTEGER,
    idArtist INTEGER,
    FOREIGN KEY (idArtist) REFERENCES artists(id)
);
```

Los datos sobreviven al reinicio del servidor. El campo `id` se genera automáticamente con `AUTOINCREMENT`, eliminando la lógica frágil de `Math.max()`.

#### Consulta con agregación

El DAO implementa una consulta `LEFT JOIN` para obtener el número de canciones y la duración total de cada artista en una sola consulta:

```javascript
export function getAll() {
    const stmt = db.prepare(`
        SELECT 
            artists.id as id,
            artists.name as name,
            count(songs.id) as songs,
            sum(songs.duration) as duration
        FROM artists 
        LEFT JOIN songs ON artists.id = songs.idArtist 
        GROUP BY artists.id
    `);
    return stmt.all();
}
```

---

### 3. Generación de IDs

| Aspecto | `from` | `to` |
|---------|--------|------|
| Método | `Math.max(...ids) + 1` | `AUTOINCREMENT` de SQLite |
| Fallo con array vacío | ✅ Produce `-Infinity` | ❌ No ocurre |
| Unicidad garantizada | ❌ No (concurrencia) | ✅ Sí |

---

### 4. Manejo de errores en actualizaciones y borrados

#### En `from`: sin comprobación de cambios reales

```javascript
app.put("/artists/:idArtist", function(req, res) {
    const found = artists.find(e => e.id === idArtist);
    // si found es undefined, esto produce un error 500
    found.name = newData.name;
    res.status(200).send(found);
});
```

#### En `to`: usando el retorno del DAO

```javascript
// artists.dao.js
export function updateArtist(id, newArtist) {
    const stmt = db.prepare("UPDATE artists SET name = ? WHERE id = ?");
    const data = stmt.run(newArtist.name, id);
    return data.changes > 0; // true si se actualizó algo, false si el id no existe
}

// controller.js
export function updateArtist(req, res) {
    if (!dao.updateArtist(id, newData)) {
        return res.status(404).json({ error: "artista no encontrado" });
    }
    return res.status(200).json(newData);
}
```

SQLite devuelve `changes > 0` si la operación afectó alguna fila, lo que permite detectar el 404 sin necesidad de una consulta adicional.

---

## 📊 Comparativa de Diseño

| Aspecto | `from` | `to` |
|---------|--------|------|
| Arquitectura | Monolítica (1 archivo) | Capas separadas (app / controller / DAO) |
| Persistencia | En memoria (array) | SQLite (base de datos real) |
| Generación de IDs | `Math.max()` manual | `AUTOINCREMENT` de SQL |
| Mantenibilidad | Baja — cambiar el storage requiere tocar todo | Alta — solo se modifica el DAO |
| Testabilidad | Difícil — todo está acoplado | Fácil — cada capa es independiente |
| Escalabilidad | Baja | Alta — se puede cambiar SQLite por PostgreSQL modificando solo el DAO |
| CRUD de canciones | Completo (en memoria) | Pendiente de migrar a SQLite |

---

## ⚠️ Estado actual del proyecto `to`

El refactor de esta sesión se ha centrado en el **CRUD de artistas**. El CRUD de canciones aún utiliza datos en memoria (ficheros `songs.js` y `songs.dao.js` con arrays).

### Tarea para la próxima sesión

Completar el CRUD de canciones a imagen y semejanza del artista, siguiendo las directrices del enunciado:

- Migrar `songs.dao.js` para usar SQLite
- Implementar los endpoints de canciones en `controller.js` y registrarlos en `app.js`
- Seguir el mismo patrón de capas: `app.js` → `controller.js` → `songs.dao.js`

---

## 💡 Lección clave

> **Si se acopla la presentación, la lógica y el acceso a datos en un solo módulo, el refactor de JSON en memoria a SQL obliga a modificar todo el código.**
>
> Con la arquitectura en capas, cambiar de SQLite a cualquier otra tecnología de persistencia solo requiere modificar el DAO, sin tocar las rutas ni el controlador.

