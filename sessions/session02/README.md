# Sesión 2: APIs REST, Verbos HTTP y CRUD

**fecha**: 9 de febrero de 2026

### Introducción a APIs REST

En esta sesión profundizamos en la creación de APIs RESTful (Representational State Transfer), un estilo de arquitectura para servicios web que utiliza los métodos estándar de HTTP para realizar operaciones sobre recursos.

**Conceptos clave**:

- **API REST**: Interfaz de programación de aplicaciones que sigue los principios REST
- **Recurso**: Entidad que puede ser accedida y manipulada (en nuestro caso, "todos")
- **Endpoint**: URL específica que responde a peticiones HTTP
- **CRUD**: Create (Crear), Read (Leer), Update (Actualizar), Delete (Eliminar)

## 📋 Proyecto: Gestor de Tareas (Todos)

### Objetivo del proyecto

Crear una API REST completa que gestione una lista de tareas (todos), implementando todas las operaciones CRUD utilizando los verbos HTTP apropiados.

## 🌐 Conceptos HTTP

### Códigos de Estado (Status Codes)

Los códigos de estado HTTP indican el resultado de una petición:

| Código | Significado           | Uso en nuestra API                   |
| ------ | --------------------- | ------------------------------------ |
| 200    | OK                    | Operación exitosa (GET, PUT, DELETE) |
| 201    | Created               | Recurso creado exitosamente (POST)   |
| 404    | Not Found             | Recurso no encontrado                |
| 500    | Internal Server Error | Error del servidor                   |

### Verbos HTTP

| Verbo  | Propósito                   | Idempotente | Ejemplo                     |
| ------ | --------------------------- | ----------- | --------------------------- |
| GET    | Obtener recursos            | ✅ Sí       | Leer lista de todos         |
| POST   | Crear nuevo recurso         | ❌ No       | Crear nuevo todo            |
| PUT    | Actualizar recurso completo | ✅ Sí       | Marcar todo como completado |
| DELETE | Eliminar recurso            | ✅ Sí       | Eliminar un todo            |

> **Idempotente**: Una operación es idempotente si ejecutarla múltiples veces produce el mismo resultado que ejecutarla una sola vez.

## 🚀 Configuración del Proyecto

### Dependencias instaladas

```json
{
  "dependencies": {
    "express": "^5.2.1", // Framework web
    "chalk": "^5.6.2", // Colores en consola
    "cors": "^2.8.6" // Cross-Origin Resource Sharing
  },
  "devDependencies": {
    "nodemon": "^3.1.11" // Recarga automática
  }
}
```

### Configuración inicial del servidor

```javascript
import express from "express";
import chalk from "chalk";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json()); // Parsea el body de las peticiones JSON
app.use(cors()); // Permite peticiones desde otros orígenes
```

#### ¿Qué es CORS?

> **CORS** (Cross-Origin Resource Sharing) es un mecanismo que permite que recursos de una página web sean solicitados desde otro dominio. Sin esto, un frontend en `localhost:5173` no podría comunicarse con nuestro backend en `localhost:3000`.

## 💾 Estructura de Datos

```javascript
let todos = [
  { id: 1, text: "aprender node", done: false },
  { id: 2, text: "aprender javascript", done: false },
  { id: 3, text: "aprender express", done: false },
  { id: 4, text: "ver videos de node", done: false },
];
```

> **Nota**: En producción, estos datos estarían en una base de datos. Aquí usamos un array en memoria para simplificar.

## 📍 Endpoints Implementados

### 1. Página de Inicio

```javascript
app.get("/", function (req, res) {
  res.send(
    "<a href='http://localhost:3000/todos'>click aqui para ver los todos</a>",
  );
});
```

- **Método**: GET
- **Ruta**: `/`
- **Descripción**: Página de bienvenida con enlace a los todos
- **Respuesta**: HTML simple

### 2. Obtener Todos los Todos (GET ALL)

```javascript
app.get("/todos", function (req, res) {
  res.status(200).send(todos);
});
```

- **Método**: GET
- **Ruta**: `/todos`
- **Descripción**: Devuelve la lista completa de todos
- **Status Code**: 200 (OK)
- **Respuesta**:
  ```json
  [
    { "id": 1, "text": "aprender node", "done": false },
    { "id": 2, "text": "aprender javascript", "done": false }
  ]
  ```

### 3. Obtener un Todo por ID (GET Individual)

```javascript
app.get("/todos/:ID", function (req, res) {
  const ID = parseInt(req.params.ID);

  const found = todos.find(function (unTodo) {
    return unTodo.id === ID;
  });

  res.status(200).send(found);
});
```

- **Método**: GET
- **Ruta**: `/todos/:ID`
- **Descripción**: Devuelve un todo específico por su ID
- **Parámetros de ruta**: `ID` (número)
- **Status Code**: 200 (OK)
- **Ejemplo**: `GET /todos/1`
- **Respuesta**:
  ```json
  { "id": 1, "text": "aprender node", "done": false }
  ```

**Conceptos clave**:

- **req.params**: Objeto que contiene los parámetros de la ruta
- **parseInt()**: Convierte string a número
- **Array.find()**: Busca el primer elemento que cumple la condición

### 4. Crear un Nuevo Todo (POST)

```javascript
app.post("/todos", function (req, res) {
  const newTodo = req.body;
  newTodo.id = todos.length + 1;
  todos.push(newTodo);
  res.status(201).send(newTodo);
});
```

- **Método**: POST
- **Ruta**: `/todos`
- **Descripción**: Crea un nuevo todo
- **Body** (JSON):
  ```json
  {
    "text": "aprender APIs REST",
    "done": false
  }
  ```
- **Status Code**: 201 (Created)
- **Respuesta**: El todo creado con su ID asignado
  ```json
  { "id": 5, "text": "aprender APIs REST", "done": false }
  ```

**Conceptos clave**:

- **req.body**: Contiene los datos enviados en el cuerpo de la petición
- **express.json()**: Middleware que parsea el JSON automáticamente
- **Status 201**: Indica que se creó un nuevo recurso

### 5. Eliminar un Todo (DELETE)

```javascript
app.delete("/todos/:ID", function (req, res) {
  const ID = parseInt(req.params.ID);

  const found = todos.find((e) => e.id === ID);
  todos = todos.filter((e) => e.id !== ID);

  res.status(200).send(found);
});
```

- **Método**: DELETE
- **Ruta**: `/todos/:ID`
- **Descripción**: Elimina un todo específico
- **Parámetros de ruta**: `ID` (número)
- **Status Code**: 200 (OK)
- **Ejemplo**: `DELETE /todos/1`
- **Respuesta**: El todo eliminado

**Conceptos clave**:

- **Array.filter()**: Crea un nuevo array sin el elemento eliminado
- **Arrow functions**: Sintaxis moderna `(e) => e.id !== ID`

### 6. Actualizar un Todo (PUT)

```javascript
app.put("/todos/:ID", function (req, res) {
  const ID = parseInt(req.params.ID);
  const newData = req.body;

  const found = todos.find((element) => {
    return element.id === ID;
  });

  found.done = newData.done;

  res.status(200).send(found);
});
```

- **Método**: PUT
- **Ruta**: `/todos/:ID`
- **Descripción**: Actualiza el estado de un todo (marca como completado/no completado)
- **Parámetros de ruta**: `ID` (número)
- **Body** (JSON):
  ```json
  {
    "done": true
  }
  ```
- **Status Code**: 200 (OK)
- **Ejemplo**: `PUT /todos/1`
- **Respuesta**: El todo actualizado

**Nota**: En este caso, solo actualizamos el campo `done`. En una implementación más completa, podríamos actualizar todos los campos.

## 🎯 Tabla Resumen de Endpoints

| Método | Endpoint     | Acción        | Status | Body             |
| ------ | ------------ | ------------- | ------ | ---------------- |
| GET    | `/`          | Página inicio | 200    | -                |
| GET    | `/todos`     | Listar todos  | 200    | -                |
| GET    | `/todos/:ID` | Obtener uno   | 200    | -                |
| POST   | `/todos`     | Crear nuevo   | 201    | `{ text, done }` |
| PUT    | `/todos/:ID` | Actualizar    | 200    | `{ done }`       |
| DELETE | `/todos/:ID` | Eliminar      | 200    | -                |

## 🧪 Probando la API

### Con curl (Terminal)

```bash
# Obtener todos
curl http://localhost:3000/todos

# Obtener uno específico
curl http://localhost:3000/todos/1

# Crear nuevo
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "nueva tarea", "done": false}'

# Actualizar
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"done": true}'

# Eliminar
curl -X DELETE http://localhost:3000/todos/1
```

### Con JavaScript (fetch)

```javascript
// GET - Obtener todos
fetch("http://localhost:3000/todos")
  .then((res) => res.json())
  .then((data) => console.log(data));

// POST - Crear nuevo
fetch("http://localhost:3000/todos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: "nueva tarea", done: false }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));

// PUT - Actualizar
fetch("http://localhost:3000/todos/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ done: true }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));

// DELETE - Eliminar
fetch("http://localhost:3000/todos/1", {
  method: "DELETE",
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

## 🔧 Iniciando el Servidor

```javascript
app.listen(3000, function () {
  console.log(chalk.blue("http://localhost:3000"));
});
```

### Comandos disponibles

```bash
# Modo desarrollo (con recarga automática)
npm run dev

# Modo producción
npm start
```

## 💡 Conceptos Importantes Aprendidos

### 1. Arquitectura REST

- **REST** es un estándar de facto para crear APIs web
- Usa URLs para identificar recursos
- Usa verbos HTTP para definir operaciones
- Es stateless (sin estado) - cada petición es independiente

### 2. Principios de diseño de APIs

- **Nombres en plural**: `/todos` en lugar de `/todo`
- **IDs en la ruta**: `/todos/:ID` para operaciones sobre recursos específicos
- **Verbos HTTP apropiados**: GET para leer, POST para crear, etc.
- **Status codes correctos**: 200 para éxito, 201 para creación, etc.

### 3. Middleware en Express

```javascript
app.use(express.json()); // Middleware de aplicación
app.use(cors()); // Middleware de terceros
```

> **Middleware**: Funciones que tienen acceso a los objetos `req` y `res`, y pueden modificarlos o terminar el ciclo de petición-respuesta.

### 4. Métodos de Array útiles

- **find()**: Encuentra el primer elemento que cumple una condición
- **filter()**: Crea un nuevo array con elementos que cumplen una condición
- **push()**: Añade un elemento al final del array

### 5. Operaciones CRUD completas

Ahora sabemos implementar las cuatro operaciones básicas:

- ✅ **C**reate (POST)
- ✅ **R**ead (GET)
- ✅ **U**pdate (PUT)
- ✅ **D**elete (DELETE)

## 🎓 Mejoras Propuestas

Para una versión más robusta de esta API, considera:

1. **Validación de datos**: Verificar que los datos recibidos son correctos
2. **Manejo de errores**: Responder con 404 si un todo no existe
3. **Persistencia**: Usar una base de datos en lugar de un array en memoria
4. **Autenticación**: Proteger endpoints con tokens o sesiones
5. **Paginación**: Limitar resultados en GET `/todos`
6. **Búsqueda y filtrado**: Añadir query parameters como `?done=true`

## 🏠 Tareas para la Próxima Sesión

### 📺 Videos recomendados

- [Qué es una API REST](https://www.youtube.com/watch?v=s7wmiS2mSXY)
- [HTTP Status Codes Explained](https://www.youtube.com/watch?v=VLH3FMQ5BIQ)

### 📚 Estudio de la versión mejorada

**Se recomienda encarecidamente:** Analiza y comprende el código de `todos-improved/`

- Observa cómo se organiza el código en capas
- Entiende el flujo de una petición desde `index.js` → controlador → DAO → datos
- Identifica las diferencias entre la versión original y mejorada
- Practica refactorizando código en capas

Este es un paso importante para escribir código profesional y escalable.

### 🧠 Reflexiones

1. ¿Por qué es importante usar los verbos HTTP correctos?
2. ¿Qué ventajas tiene separar el frontend del backend mediante una API?
3. ¿Cómo mejorarías la gestión de errores en esta API?
4. ¿Qué beneficios tiene la arquitectura en capas respecto al código monolítico?

### 🔍 Investigación opcional

- Explora Postman o Thunder Client para probar APIs
- Investiga sobre códigos de estado HTTP de la familia 4xx y 5xx
- Lee sobre las diferencias entre PUT y PATCH
- Investiga sobre patrones DAO (Data Access Object) y MVC

## 📁 Estructura del Proyecto

```
todos/
├── package.json          # Configuración y dependencias
├── index.js              # Servidor con API REST completa
└── node_modules/         # Dependencias instaladas
```

---

## 🚀 Versión Mejorada: `todos-improved`

**⏰ Desarrollado fuera de las horas de sesión como mejora del código original**

Se ha creado una versión refactorizada del proyecto que implementa **mejores prácticas de desarrollo** y **arquitectura en capas**:

### ✨ Características de la versión mejorada

- **Arrow Functions**: Todo el código utiliza sintaxis moderna de funciones flecha
- **Arquitectura Modular**: Separación clara de responsabilidades en capas
- **Código más legible**: Estructura organizada y fácil de mantener
- **Escalabilidad**: Preparado para futuras expansiones

### 📂 Estructura del proyecto mejorado

```
todos-improved/
├── package.json                    # Dependencias del proyecto
├── index.js                        # Punto de entrada (rutas únicamente)
├── data.js                         # Almacenamiento de datos
├── dao/
│   └── todos.dao.js               # Capa de acceso a datos (Data Access Object)
├── controller/
│   └── todos.controller.js        # Lógica de negocio y controladores
└── node_modules/                   # Dependencias instaladas
```

### 🏗️ Arquitectura en Capas

1. **Capa de Presentación** (`index.js`): Solo define las rutas
2. **Capa de Controladores** (`controller/todos.controller.js`): Maneja las peticiones HTTP
3. **Capa de Datos** (`dao/todos.dao.js`): Operaciones CRUD sobre los datos
4. **Capa de Almacenamiento** (`data.js`): Datos centralizados

### 💡 Ventajas de esta estructura

- **Mantenibilidad**: Cambios aislados a su capa correspondiente
- **Testabilidad**: Cada capa puede probarse independientemente
- **Reutilización**: Funciones DAO pueden usarse desde múltiples controladores
- **Profesionalismo**: Sigue patrones de desarrollo reales
