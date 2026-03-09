# Sesión 5: Desarrollo Frontend con Astro — Actividades prácticas

**fecha**: 9 de marzo de 2026

## 📋 Resumen de la Sesión

Esta sesión es principalmente práctica. Se presentan tres actividades relacionadas con el desarrollo frontend utilizando **Astro** y **Tailwind CSS**, y se dedica la mayor parte del tiempo a la tutoría y al trabajo autónomo del alumno.

Durante la sesión se refuerzan los conceptos de **rutas dinámicas en Astro**, que permiten generar páginas a partir de la URL del recurso, y se presentan los tres enunciados con sus requisitos.

---

## 📝 Actividades

Se han presentado 3 actividades:

- [ENUNCIADO 1 — Spotify Astro Frontend](ENUNCIADO-01.md)
- [ENUNCIADO 2 — CV con Astro + Tailwind](ENUNCIADO-02.md)
- [ENUNCIADO 3 — Landing Page con Astro](ENUNCIADO-03.md)

---

### Actividad 1 — Spotify Astro Frontend

Esta actividad pone en práctica el **consumo de una API REST desde el frontend**. El alumno debe construir una interfaz visual que muestre los artistas y sus canciones, conectando con la API Express desarrollada en sesiones anteriores.

Conceptos clave que explora:

- **Consumo de APIs REST desde el frontend** con `fetch` en el frontmatter de Astro
- **Organización de proyectos con Astro**: layouts, pages y components
- **Creación de componentes reutilizables** (tarjeta de artista, listado de canciones)
- **Rutas dinámicas** para generar una página por artista: `/artists/[id].astro`
- **Diseño de interfaces modernas con Tailwind CSS**

---

### Actividad 2 — CV con Astro + Tailwind

Esta actividad propone recuperar el CV web desarrollado en la asignatura PMI y reimplementarlo con Astro. El objetivo principal es la **modularización** del proyecto.

Conceptos clave que explora:

- **Componentización**: dividir la página en componentes independientes (Header, Profile, Skills, Footer…)
- **Componentes reutilizables** con Astro
- **Organización de proyectos frontend** con una estructura de carpetas clara
- **Diseño con Tailwind CSS**: tipografía, espaciado y responsive

---

### Actividad 3 — Landing Page con Astro

Esta actividad propone crear una landing page de un producto o servicio ficticio, integrando una **librería externa de JavaScript** (`canvas-confetti`).

Conceptos clave que explora:

- **Diseño visual** y estructura de secciones (Hero, Features, CTA…)
- **Componentes reutilizables** para cada sección
- **Integración de librerías externas** de npm en Astro
- **Directivas de cliente** en Astro para ejecutar JavaScript en el navegador
- **Diseño responsive** con Tailwind CSS

---

## 💡 Conceptos explicados en sesión

### Rutas dinámicas en Astro

Las rutas dinámicas permiten generar una página por cada recurso a partir de su identificador en la URL. Por ejemplo, para mostrar la página de un artista concreto, se crea el archivo:

```
src/pages/artists/[id].astro
```

La URL `/artists/42` renderizará ese componente con `id = "42"` disponible en `Astro.params`.

```astro
---
const { id } = Astro.params;

const response = await fetch(`http://localhost:3000/artists/${id}/songs`);
const songs = await response.json();
---

<h1>Canciones del artista {id}</h1>
<ul>
  { songs.map(song => <li>{song.name}</li>) }
</ul>
```

> 🔗 Referencia oficial: [Astro — Dynamic Routes](https://docs.astro.build/en/guides/routing/#dynamic-routes)

---

### Props en componentes Astro

Los componentes Astro reciben datos del exterior mediante **props**, que se declaran y leen en el frontmatter con `Astro.props`:

```astro
---
// Artist.astro
const { name, genre } = Astro.props;
---
<div class="border rounded-xl p-4">
  <h2 class="text-xl font-bold">{name}</h2>
  <p class="text-gray-500">{genre}</p>
</div>
```

Y se usan así desde la página o componente padre:

```astro
<Artist name="Radiohead" genre="Alternative Rock" />
```

> 🔗 Referencia oficial: [Astro — Component Props](https://docs.astro.build/en/basics/astro-components/#component-props)

---

### Fetch en el frontmatter (SSG / SSR)

En Astro, el frontmatter se ejecuta en el **servidor** (o en tiempo de build). Esto permite hacer peticiones a APIs directamente sin exponer la lógica al cliente:

```astro
---
const response = await fetch("http://localhost:3000/artists");
const artists = await response.json();
---

{ artists.map(artist => <p>{artist.name}</p>) }
```

El resultado es HTML estático: el navegador nunca ve el `fetch` ni la URL de la API interna.

> 🔗 Referencia oficial: [Astro — Data Fetching](https://docs.astro.build/en/guides/data-fetching/)

---

### Integración de librerías externas con JavaScript de cliente

Astro genera HTML estático por defecto: el JavaScript del frontmatter **no llega al navegador**. Para ejecutar código JavaScript en el cliente (como `canvas-confetti`), se necesita un `<script>` procesado por Astro:

```astro
<button id="btn">¡Confetti!</button>

<script>
  import confetti from "canvas-confetti";

  document.getElementById("btn").addEventListener("click", () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  });
</script>
```

Con esta opción, Astro procesa el `<script>` con el bundler (Vite) y la librería se importa correctamente desde `node_modules`.

> 🔗 Referencia oficial: [Astro — Scripts and Event Handling](https://docs.astro.build/en/guides/client-side-scripts/)
> 🔗 Librería: [canvas-confetti en npm](https://www.npmjs.com/package/canvas-confetti)

---

## 🔗 Referencias

| Recurso | URL |
|---|---|
| Astro — Dynamic Routes | https://docs.astro.build/en/guides/routing/#dynamic-routes |
| Astro — Component Props | https://docs.astro.build/en/basics/astro-components/#component-props |
| Astro — Data Fetching | https://docs.astro.build/en/guides/data-fetching/ |
| Astro — Client-side Scripts | https://docs.astro.build/en/guides/client-side-scripts/ |
| Tailwind CSS — Responsive Design | https://tailwindcss.com/docs/responsive-design |
| Tailwind CSS — Utility Classes | https://tailwindcss.com/docs/utility-first |
| canvas-confetti | https://www.npmjs.com/package/canvas-confetti |
