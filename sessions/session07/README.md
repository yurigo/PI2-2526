# Sesión 07 – Deploy de aplicaciones en tiempo real

## Resumen de la sesión

En esta sesión se han presentado y evaluado ejercicios de los alumnos correspondientes a la [Actividad 03 de la sesión 06 – Cursores compartidos en tiempo real](../session06/ENUNCIADO-03.md).

Se ha realizado el **deploy real** de una de las soluciones de los alumnos utilizando la arquitectura:

```
cliente → Astro → Vercel
servidor → Node.js + Express + Socket.IO → Render.com
```

Se ha trabajado con **repositorios separados** para cliente y servidor, conectados cada uno a su plataforma de hosting vía **CI/CD**.

Se ha presentado el **proyecto futuro** de la asignatura: un sistema en tiempo real con jugadores, administrador y un láser controlado vía Socket.IO.

---

## Actividades revisadas en clase

### [Actividad 03 de sesión 06 – Cursores compartidos en tiempo real](../session06/ENUNCIADO-03.md)

Se han expuesto y corregido soluciones de los alumnos. Los aspectos clave del ejercicio son:

- Envío frecuente de posiciones de cursor via `socket.emit`.
- Gestión de cursores ajenos con identificadores visuales (colores, nombres).
- Eliminación del cursor al desconectarse (`disconnect`).
- Aplicación de *throttling* para no saturar el servidor.

Durante la corrección se identificaron problemas habituales de deploy:

- CORS no configurado para el dominio de producción.
- URL del servidor escrita directamente en el código (en lugar de usar variables de entorno).
- Cliente y servidor en el mismo repositorio, lo que dificultaba el deploy por separado.

---

## Problemas encontrados durante el deploy

### 1. JavaScript de un componente Astro no funcionaba en producción

**Síntoma**: el código JavaScript funcionaba correctamente en desarrollo (`npm run dev`) pero dejaba de funcionar tras publicar en Vercel. El mismo fallo se reproducía localmente haciendo `npm run build && npm run preview`.

**Causa**: el código del cliente estaba cargado mediante la importación `?url` de Vite y añadido dinámicamente al DOM con un `<script type="module">`:

```js
// ❌ Enfoque problemático
import clientScript from './client.js?url';

const script = document.createElement('script');
script.type = 'module';
script.src = clientScript;
document.head.appendChild(script);
```

Al inyectar el archivo como URL externa, **Astro no lo procesa** durante el build. Esto significa que cualquier referencia a `import.meta.env.PUBLIC_*` dentro de ese archivo permanece sin sustituir y vale `undefined` en producción.

**Solución**: mover el código de inicialización del cliente dentro de un `<script>` estándar en el propio archivo `.astro`, para que Astro/Vite lo procese y reemplace los valores de `import.meta.env` en tiempo de build:

```astro
<script>
  // ✅ Código de cliente procesado por Astro/Vite
  // import.meta.env es reemplazado en tiempo de build
  import { io } from 'socket.io-client';
  const socket = io(import.meta.env.PUBLIC_SOCKET_URL);
</script>
```

Si necesitas pasar un valor calculado desde el frontmatter al script de cliente, usa la directiva `define:vars`. Ten en cuenta que los bloques `<script define:vars>` se inyectan como scripts inline y **no admiten `import`**; úsalos para compartir variables simples:

```astro
---
// Frontmatter (código de servidor)
const socketUrl = import.meta.env.PUBLIC_SOCKET_URL;
---

<script define:vars={{ socketUrl }}>
  // socketUrl está disponible como variable JS aquí
  // ⚠️ No uses import() dentro de define:vars
  console.log('Conectando a:', socketUrl);
</script>
```

> 💡 La clave es que `import.meta.env` **solo funciona en código que Astro/Vite compila**. Si el fichero se sirve directamente como asset (vía `?url`), Astro no lo toca.

Referencias:
- [Scripts en Astro](https://docs.astro.build/es/guides/client-side-scripts/)
- [define:vars en Astro](https://docs.astro.build/es/reference/directives-reference/#definevars)
- [Commit con la solución aplicada](https://github.com/yurigo/constellation-cursors-client/commit/fa3aed3d75ce07484070c4ca0b0f1a6b01f84870)

---

### 2. La opción `output: 'server'` en `astro.config.mjs` rompe el deploy

**Síntoma**: en desarrollo funcionaba todo correctamente, pero al desplegar en Vercel la aplicación no arrancaba y se mostraban errores de build o de ejecución.

**Causa**: tener configurado `output: 'server'` (o `output: 'hybrid'`) activa el **modo SSR** de Astro, que requiere un servidor Node.js para ejecutarse. Vercel necesita un **adapter** específico instalado para poder servir ese tipo de proyecto:

```js
// ❌ astro.config.mjs — requiere adapter en producción
export default defineConfig({
  output: 'server', // SSR: necesita adapter
});
```

Sin el adapter, Astro no sabe cómo empaquetar la aplicación para la plataforma de destino.

**Solución A**: cambiar a `output: 'static'` si la aplicación no necesita SSR (es el caso habitual de un frontend que solo consume una API externa):

```js
// ✅ astro.config.mjs — generación estática, sin adapter
export default defineConfig({
  output: 'static',
});
```

**Solución B**: mantener `output: 'server'` e instalar el adapter de Vercel:

```bash
npx astro add vercel
```

Esto añade automáticamente `@astrojs/vercel` y actualiza `astro.config.mjs`.

Referencias:
- [Modos de renderizado en Astro](https://docs.astro.build/es/basics/rendering-modes/)
- [Adapter de Vercel para Astro](https://docs.astro.build/es/guides/integrations-guide/vercel/)

---

### 3. Cliente y servidor en el mismo repositorio dificulta el deploy

**Síntoma**: al intentar conectar el proyecto a Vercel (cliente) y a Render (servidor), surgían conflictos porque ambas plataformas detectaban el mismo repositorio y trataban de desplegar el proyecto entero.

**Causa**: Vercel está optimizado para frontends y Render para backends. Si cliente y servidor conviven en el mismo repositorio, es difícil indicar a cada plataforma qué parte debe desplegar.

**Solución**: mantener **repositorios separados** desde el inicio:

```
repositorio-cliente/   → conectado a Vercel
repositorio-servidor/  → conectado a Render
```

Cada repositorio tiene su propio `package.json`, su propio pipeline de CI/CD y su propia URL pública. El cliente apunta al servidor usando la variable de entorno `PUBLIC_SOCKET_URL`.

---

## Conceptos difíciles – Referencias y ejemplos

### Deploy del cliente con Vercel

[Vercel](https://vercel.com) es una plataforma de hosting especializada en frontends estáticos y frameworks como Astro, Next.js, etc. Permite conectar un repositorio de GitHub y desplegar automáticamente en cada push (*CI/CD*).

Pasos básicos para desplegar un proyecto Astro en Vercel:

1. Crear un repositorio de GitHub **separado** con el proyecto cliente (Astro).
2. Conectar el repositorio en [vercel.com](https://vercel.com) → *Add New Project*.
3. Vercel detecta automáticamente que es un proyecto Astro y configura el build.
4. Cada `git push` despliega automáticamente a una URL pública.

> ⚠️ Recuerda configurar las variables de entorno (por ejemplo, la URL del servidor de Socket.IO) en el panel de Vercel, **nunca** en el código fuente.

Referencias:
- [Guía de deploy de Astro en Vercel](https://docs.astro.build/es/guides/deploy/vercel/)
- [Documentación de Vercel](https://vercel.com/docs)

---

### Deploy del servidor con Render.com

[Render.com](https://render.com) permite alojar servidores Node.js de forma gratuita, con soporte para **WebSockets** (necesario para Socket.IO).

Pasos básicos para desplegar un servidor Node.js en Render:

1. Crear un repositorio de GitHub **separado** con el servidor (Node.js + Express + Socket.IO).
2. Crear un nuevo *Web Service* en [render.com](https://render.com) conectado al repositorio.
3. Configurar el comando de inicio (por ejemplo `node server.js` o `npm start`).
4. Cada `git push` despliega automáticamente (*CI/CD*).

> ⚠️ En el plan gratuito de Render, el servidor entra en "sleep" tras un período de inactividad. La primera conexión puede tardar ~30 segundos en despertar.

Referencias:
- [Deploy Node.js en Render](https://render.com/docs/deploy-node-express-app)
- [Soporte WebSocket en Render](https://render.com/docs/web-sockets)

---

### CORS en producción

Cuando cliente y servidor están en dominios distintos (por ejemplo `mi-app.vercel.app` y `mi-servidor.onrender.com`), el navegador aplica la política **CORS** (*Cross-Origin Resource Sharing*) y bloqueará las peticiones si el servidor no lo permite explícitamente.

En el servidor Express + Socket.IO, configura CORS indicando el dominio exacto del cliente:

```js
import { Server } from 'socket.io';

const io = new Server(httpServer, {
  cors: {
    origin: 'https://mi-app.vercel.app', // URL exacta del cliente en producción
    methods: ['GET', 'POST']
  }
});
```

> ⚠️ Usar `origin: '*'` funciona en desarrollo pero es inseguro en producción. Especifica siempre el dominio concreto del cliente.

Referencias:
- [CORS en Socket.IO](https://socket.io/docs/v4/handling-cors/)
- [MDN – CORS](https://developer.mozilla.org/es/docs/Web/HTTP/CORS)

---

### Variables de entorno

La URL del servidor cambia entre desarrollo (`http://localhost:3000`) y producción (`https://mi-servidor.onrender.com`). Nunca escribas estas URLs directamente en el código fuente.

En el cliente Astro, usa variables de entorno con prefijo `PUBLIC_` para que sean accesibles desde el navegador:

```js
// En el script del componente .astro o en un archivo .js del cliente
const SOCKET_URL = import.meta.env.PUBLIC_SOCKET_URL;
const socket = io(SOCKET_URL);
```

En el archivo `.env` local (nunca lo subas a GitHub):

```
PUBLIC_SOCKET_URL=http://localhost:3000
```

En Vercel, configura la variable `PUBLIC_SOCKET_URL` con la URL de Render desde el panel de configuración del proyecto (*Settings → Environment Variables*).

Referencias:
- [Variables de entorno en Astro](https://docs.astro.build/es/guides/environment-variables/)
- [Variables de entorno en Vercel](https://vercel.com/docs/environment-variables)

---

### Ports Forwarding en VS Code

Durante la clase se utilizó el **reenvío de puertos** (*Ports Forwarding*) de VS Code para exponer temporalmente el servidor local a Internet, permitiendo testear la aplicación sin necesidad de hacer deploy.

En VS Code: pestaña `PORTS` → `Forward a Port` → introduce el número de puerto (por ejemplo `3000`) → copia la URL pública generada.

> ⚠️ Este método es solo para pruebas. Para producción usa Render.com u otro servicio de hosting permanente.

Referencias:
- [Port forwarding en VS Code](https://code.visualstudio.com/docs/editor/port-forwarding)

---

## Proyecto futuro

Se ha presentado el próximo proyecto de la asignatura. Se trata de un sistema en tiempo real con tres tipos de participantes:

- **Clientes jugadores**: mueven su cursor y el servidor registra sus coordenadas.
- **Cliente administrador**: visualiza en tiempo real las posiciones de todos los jugadores.
- **Servidor**: Node.js + Express + Socket.IO como nodo central de coordinación.

En una fase avanzada, el administrador podrá conectarse a un láser ([Laserworld DS-1000RGB MK5](https://www.laserworld.com/)) que pintará en tiempo real las posiciones de los jugadores.