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
| 5   | [Sesión 05 - Actividades prácticas con Astro](sessions/session05/README.md) | Sesión práctica con tutoría: rutas dinámicas en Astro, props, fetch en frontmatter e integración de librerías externas | — |
| 6   | [Sesión 06 - Comunicación en tiempo real con Socket.IO](sessions/session06/README.md) | Arquitectura cliente-servidor en tiempo real, introducción a Socket.IO, eventos bidireccionales y API Canvas de HTML5 | — |

## 📝 Actividades

| Sesión | Actividad                                                                    | Descripción                                                                | Deadline                         |
| ------ | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------- |
| 2      | [Spotify API REST - Artistas y Canciones](sessions/session02/ENUNCIADO.md) | API REST con rutas anidadas para gestionar artistas y sus canciones (CRUD) | 22 de febrero de 2026 a las 23:59 |
| 5      | [Spotify Astro Frontend](sessions/session05/ENUNCIADO-01.md) | Frontend con Astro y Tailwind que consume la API REST de artistas y canciones, con rutas dinámicas | 15 de marzo de 2026 a las 23:59  |
| 5      | [CV con Astro + Tailwind](sessions/session05/ENUNCIADO-02.md) | Reimplementar el CV personal con Astro, componentizando el diseño con Tailwind CSS | 15 de marzo de 2026 a las 23:59 |
| 5      | [Landing Page con Astro](sessions/session05/ENUNCIADO-03.md) | Landing page de producto ficticio con Astro, Tailwind e integración de canvas-confetti | 15 de marzo de 2026 a las 23:59 |
| 6      | [Chat en tiempo real con Socket.IO](sessions/session06/ENUNCIADO-01.md) | Chat multiusuario en tiempo real con Node.js + Express + Socket.IO como backend y Astro como frontend | — |
| 6      | [Pizarra colaborativa en tiempo real](sessions/session06/ENUNCIADO-02.md) | Pizarra compartida con HTML Canvas donde varios usuarios dibujan simultáneamente en tiempo real | — |
| 6      | [Cursores compartidos en tiempo real](sessions/session06/ENUNCIADO-03.md) | Visualización de los cursores de todos los usuarios conectados con throttling de eventos | — |

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
    ├── session04/          # Middlewares en Express y Frontend con Astro
    │   ├── README.md
    │   └── (proyectos en repositorios externos)
    │       # backend: https://github.com/yurigo/PI2-2526-spotify-wip
    │       # frontend: https://github.com/yurigo/PI2-2526-astro-wip
    └── session05/          # Actividades prácticas con Astro
        ├── README.md
        ├── ENUNCIADO-01.md # Actividad: Spotify Astro Frontend
        ├── ENUNCIADO-02.md # Actividad: CV con Astro + Tailwind
        └── ENUNCIADO-03.md # Actividad: Landing Page con Astro
    └── session06/          # Comunicación en tiempo real con Socket.IO
        ├── README.md
        ├── ENUNCIADO-01.md # Actividad: Chat en tiempo real
        ├── ENUNCIADO-02.md # Actividad: Pizarra colaborativa
        └── ENUNCIADO-03.md # Actividad: Cursores compartidos
```
