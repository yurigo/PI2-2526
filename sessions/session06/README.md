# Sesión 06 – Comunicación en tiempo real con Socket.IO

## Resumen de la sesión

En la sesión de hoy se presentarán y evaluarán algunas actividades de la sesión 5.

Se continuará con el desarrollo frontend en Astro y se introducirá **socket.io** en cliente y servidor (backend en Node.js + Express + Socket.IO).

Se presenta el concepto de **arquitectura cliente-servidor en tiempo real**.

Se añaden dos imágenes/diagramas de la arquitectura propuesta:

[Ver diagrama Mermaid básico](<diagrama astro+express+socketio.mermaid.md>)
![Diagrama Astro + Express + Socket.IO](<diagrama astro+express+sockeio.png>)

[Ver diagrama Mermaid detallado](<diagrama astro+express+sockeio.detallado.mermaid.md>)
![Diagrama detallado Astro + Express + Socket.IO](<diagrama astro+express+sockeio.detallado.png>)

---

## Actividades de la sesión

### [Actividad 01 – Chat en tiempo real](ENUNCIADO-01.md)

Esta actividad explora la **comunicación bidireccional entre cliente y servidor** mediante eventos de Socket.IO. El alumno debe construir un chat funcional donde varios usuarios se conecten, envíen mensajes y vean en tiempo real los mensajes del resto.

Los conceptos clave que trabaja son:

- Ciclo de vida de una conexión Socket.IO: `connection`, `disconnect`.
- Emisión de eventos del cliente al servidor (`socket.emit`) y del servidor a todos los clientes (`io.emit` / `socket.broadcast.emit`).
- Integración del cliente de Socket.IO en una página Astro.
- Gestión de estado mínimo en el servidor (lista de usuarios conectados).

La documentación oficial y el tutorial recomendado son:
- Documentación Socket.IO v4: https://socket.io/docs/v4/
- Tutorial oficial del chat: https://socket.io/docs/v4/tutorial/introduction

---

### [Actividad 02 – Pizarra colaborativa en tiempo real](ENUNCIADO-02.md)

Esta actividad explora la **sincronización de eventos de dibujo entre múltiples clientes** mediante Socket.IO y el uso del **API Canvas de HTML5**.

Los conceptos clave que trabaja son:

- Captura de eventos de ratón sobre un `<canvas>` (`mousedown`, `mousemove`, `mouseup`).
- Serialización y envío de datos de trazos a través de Socket.IO.
- Recepción y reproducción de los trazos en los canvas de todos los clientes conectados.
- Gestión de eventos personalizados con nombre (`draw:start`, `draw:move`, `draw:end`, `clear`).

---

### [Actividad 03 – Cursores compartidos en tiempo real](ENUNCIADO-03.md)

Esta actividad explora la **transmisión frecuente de posiciones** de cursor entre clientes conectados y el concepto de **throttling** para no saturar el servidor.

Los conceptos clave que trabaja son:

- Envío periódico de la posición del cursor al servidor (`mousemove`).
- Limitación de la frecuencia de envío de eventos (*throttling*).
- Renderizado de cursores ajenos en pantalla con identificadores visuales (colores, nombres).
- Gestión de la desconexión: eliminar el cursor del usuario que abandona la sesión.

---

## Conceptos difíciles – Referencias y ejemplos

### WebSockets y Socket.IO

HTTP es un protocolo de petición-respuesta: el cliente siempre inicia la comunicación. Para comunicación en tiempo real necesitamos un canal **persistente y bidireccional**, que es lo que ofrece **WebSocket**.

Socket.IO es una librería que abstrae WebSocket (y añade fallbacks) y facilita el trabajo con **eventos con nombre**.

**Ejemplo básico servidor (Node.js + Express + Socket.IO):**

```js
// server.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('mensaje', (data) => {
    // Reenviar el mensaje a TODOS los clientes conectados
    io.emit('mensaje', data);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

httpServer.listen(3000);
```

**Ejemplo básico cliente (JavaScript en el navegador):**

```js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Conectado con id:', socket.id);
});

socket.emit('mensaje', { texto: 'Hola a todos' });

socket.on('mensaje', (data) => {
  console.log('Mensaje recibido:', data.texto);
});
```

> ⚠️ En Astro, el cliente de Socket.IO debe ejecutarse únicamente en el navegador. Usa una directiva `client:load` en el componente o inicializa la conexión dentro de `<script>` en la plantilla `.astro`.

Referencias:
- [Cómo funciona Socket.IO internamente](https://socket.io/docs/v4/how-it-works/)
- [Cheatsheet de eventos](https://socket.io/docs/v4/emit-cheatsheet/)
- [MDN – API WebSocket](https://developer.mozilla.org/es/docs/Web/API/WebSocket)

---

### Broadcasting y salas (rooms)

- `io.emit('evento', data)` → envía a **todos** los clientes conectados.
- `socket.broadcast.emit('evento', data)` → envía a **todos excepto al emisor**.
- `socket.to('sala').emit('evento', data)` → envía a todos los clientes de una **sala** específica.

Las salas son un mecanismo de Socket.IO para agrupar conexiones lógicamente sin necesidad de gestionar manualmente las listas.

Referencia: [Rooms en Socket.IO](https://socket.io/docs/v4/rooms/)

---

### API Canvas de HTML5

El elemento `<canvas>` permite dibujar gráficos 2D mediante JavaScript. El contexto 2D se obtiene con:

```js
const canvas = document.getElementById('mi-canvas');
const ctx = canvas.getContext('2d');
```

**Trazar una línea:**

```js
ctx.beginPath();
ctx.moveTo(x1, y1);   // punto de inicio
ctx.lineTo(x2, y2);   // punto de destino
ctx.strokeStyle = '#e74c3c';
ctx.lineWidth = 3;
ctx.stroke();
```

Para la pizarra colaborativa, la posición debe traducirse a coordenadas **relativas al canvas** (no a la ventana):

```js
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
});
```

Referencias:
- [MDN – API Canvas 2D](https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D)
- [MDN – Tutorial de Canvas](https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial)

---

### Throttling de eventos

Cuando el usuario mueve el ratón, el evento `mousemove` se dispara decenas de veces por segundo. Enviar cada uno de esos eventos a través de Socket.IO puede saturar tanto el servidor como la red.

La técnica de **throttling** limita cuántas veces por segundo se ejecuta una función:

```js
// Implementación manual con timestamp
let ultimoEnvio = 0;
const INTERVALO_MS = 50; // máximo 20 eventos por segundo

canvas.addEventListener('mousemove', (e) => {
  const ahora = Date.now();
  if (ahora - ultimoEnvio < INTERVALO_MS) return;
  ultimoEnvio = ahora;

  socket.emit('cursor:move', { x: e.clientX, y: e.clientY });
});
```

También puede usarse `requestAnimationFrame` para sincronizar los envíos con el ciclo de refresco del navegador.

Referencia: [MDN – requestAnimationFrame](https://developer.mozilla.org/es/docs/Web/API/Window/requestAnimationFrame)
