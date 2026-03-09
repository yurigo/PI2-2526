# Landing Page con Astro

## Contexto

Después de trabajar con Astro y Tailwind CSS, se propone crear una
**landing page**.

El objetivo es practicar:

- diseño visual
- estructura de páginas
- componentes reutilizables
- integración de librerías externas

---

## Objetivo

Crear una **landing page de un producto o servicio ficticio**.

La temática es libre.

Ejemplos:

- app musical
- videojuego
- festival
- startup
- herramienta creativa
- producto tecnológico

No se permite hacer:

- un CV
- un portfolio personal
- copiar una web existente

---

## Secciones obligatorias

La página debe incluir al menos **5 secciones**:

- Hero principal
- Descripción del producto
- Características
- Showcase o ejemplos
- Call to action
- Footer

---

## Componentes

Debe haber **al menos 3 componentes Astro**.

Ejemplos:

- Hero
- FeatureCard
- CTASection
- Footer

---

## Requisito obligatorios

### Librería externa

Debe utilizarse la librería: https://www.npmjs.com/package/canvas-confetti

Instalación:

```
npm install canvas-confetti
```

Se debe crear un **componente que lance confetti**.

Ejemplo de uso:

```
import confetti from "canvas-confetti";

confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
```

El efecto debe activarse por ejemplo:

- al hacer click en un botón
- al cargar la página
- al pulsar un CTA

---

## Diseño

Se debe utilizar **Tailwind CSS**.

La página debe ser:

- visualmente atractiva
- responsive
- moderna

---

## Entrega

La entrega debe incluir un zip con:

- proyecto Astro completo
- README con instrucciones de ejecución
