# PI2-2526

## Sobre la Asignatura

Proyectos Interactivos 2 (PI2) es una asignatura enfocada en el desarrollo de aplicaciones web completas utilizando tecnologías modernas y el modelo cliente-servidor. La asignatura combina el desarrollo backend con Node.js y Express, junto con el frontend utilizando frameworks modernos de Javascript.

### Objetivos principales:

- **Desarrollo Full-Stack**: Dominar tanto el lado del servidor como del cliente
- **Node.js como base**: Utilizar Node.js tanto para implementar servidores como para tooling de desarrollo
- **Frameworks modernos**: Integración con herramientas actuales del ecosistema JavaScript
- **Proyectos interactivos**: Crear aplicaciones web dinámicas y responsivas
- **Arquitecturas escalables**: Comprender patrones de diseño web modernos

### Competencias a desarrollar:

- Implementación de APIs RESTful
- Gestión de bases de datos
- Desarrollo de interfaces de usuario interactivas
- Deploy y configuración de aplicaciones web
- Trabajo colaborativo con control de versiones

### Prerrequisitos:

- Conocimientos sólidos de HTML, CSS y JavaScript
- Fundamentos de programación orientada a objetos

## Sesiones Completadas

| #   | Sesión                                                                       | Descripción                                                                                                   | Proyectos                                                                                                    |
| --- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 1   | [Sesión 01 - Introducción a Node.js y Express](sessions/session01/README.md) | Introducción al curso, instalación de herramientas, Node.js REPL, npm, Express, arquitectura cliente-servidor | [helloworld](sessions/session01/projects/helloworld/)                                                        |
| 2   | [Sesión 02 - APIs REST, Verbos HTTP y CRUD](sessions/session02/README.md)    | APIs RESTful, códigos de estado HTTP, verbos HTTP (GET, POST, PUT, DELETE), operaciones CRUD completas        | [todos](sessions/session02/projects/todos/)<br>[⚠&nbsp;todos&#8209;improved&nbsp;⚠](sessions/session02/projects/todos-improved/) |
| 3   | [Sesión 03 - Arquitectura en Capas y SQLite](sessions/session03/README.md)   | Separación en capas (app/controller/DAO), persistencia con SQLite, corrección de ejercicio Spotify API        | [from](sessions/session03/projects/from/)<br>[to](sessions/session03/projects/to/) |
| 4   | [Sesión 04 - Middlewares en Express y Frontend con Astro](sessions/session04/README.md) | Middlewares globales y por ruta (morgan, cors, rate-limit, custom), frontend con Astro + Tailwind CSS consumiendo la API REST | [backend](https://github.com/yurigo/PI2-2526-spotify-wip)<br>[frontend](https://github.com/yurigo/PI2-2526-astro-wip) |

## 📝 Actividades

| Sesión | Actividad                                                                    | Descripción                                                                | Deadline                         |
| ------ | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------- |
| 2      | [Spotify API REST - Artistas y Canciones](sessions/session02/ENUNCIADO.md) | API REST con rutas anidadas para gestionar artistas y sus canciones (CRUD) | 22 de febrero de 2026 a las 23:59 |

## Recursos Adicionales

### Documentación Oficial:

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/)
- [Astro Documentation](https://docs.astro.build/)
- [Vue.js Documentation](https://vuejs.org/guide/)
- [React Documentation](https://react.dev/)

## Estructura del Repositorio

```
PI2-2526/
├── README.md
└── sessions/
    ├── session01/          # Introducción a Node.js y Express
    │   ├── README.md
    │   └── projects/
    │       └── helloworld/ # Proyecto: Primer servidor Express
    ├── session02/          # APIs REST, Verbos HTTP y CRUD
    │   ├── README.md
    │   └── projects/
    │       ├── todos/          # Proyecto: API REST para gestión de tareas
    │       └── todos-improved/ # Proyecto: API REST mejorada con arquitectura en capas
    ├── session03/          # Arquitectura en Capas y SQLite
    │   ├── README.md
    │   └── projects/
    │       ├── from/       # Ejercicio original (monolítico, datos en memoria)
    │       └── to/         # Ejercicio corregido (capas + SQLite)
    └── session04/          # Middlewares en Express y Frontend con Astro
        ├── README.md
        └── (proyectos en repositorios externos)
            # backend: https://github.com/yurigo/PI2-2526-spotify-wip
            # frontend: https://github.com/yurigo/PI2-2526-astro-wip
```
