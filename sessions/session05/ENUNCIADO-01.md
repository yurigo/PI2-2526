# Spotify Astro Frontend

## Contexto

En la actividad anterior se implementó una **API REST de artistas y
canciones** utilizando Node.js y Express.\
En esta actividad se desarrollará un **frontend con Astro y Tailwind
CSS** que consuma dicha API.

El objetivo es familiarizarse con:

- consumo de APIs REST desde el frontend
- organización de proyectos con Astro
- creación de componentes reutilizables
- diseño de interfaces modernas con Tailwind

---

## Objetivo

Crear una aplicación web inspirada en **Spotify** que permita visualizar
artistas y sus canciones utilizando la API desarrollada en la actividad
anterior.

---

## Requisitos mínimos

### Página principal

Debe mostrar:

- listado de **artistas**
- cada artista en una **tarjeta visual**
- un enlace para ver sus canciones

Endpoint utilizado:

```
GET /artists
```

---

### Página de artista

Debe mostrar:

- nombre del artista
- listado de canciones

Cada canción debe mostrar:

- nombre
- duración

Endpoint utilizado:

```
GET /artists/:idArtist/songs
```

> 🚀 El framework de Astro nos dispone un mecanimo para generar páginas dinámicas a partir de la url del recurso. Investiga en la documentación de Astro cómo poder implementar lo especificado.

---

### Diseño

La interfaz debe:

- usar **Tailwind CSS**
- tener estética moderna
- usar tarjetas o listas visuales
- incluir layout común con header

---

## Extras opcionales

- búsqueda de artistas
- formateo de duración `mm:ss`
- diseño responsive avanzado

> 🌈 Tailwind nos proporciona unas utility classes para hacer diseños responsive de forma sencilla. Investiga en la documentación de Tailwind cómo poder implementar lo especificado.

- iconos o portada de artista

---

## Entrega

La entrega debe incluir un zip con:

- código fuente completo
- README con instrucciones para ejecutar el proyecto
