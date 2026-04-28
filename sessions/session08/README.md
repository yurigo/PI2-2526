# Sesión 08 – Roles en Socket.IO y control de hardware con Node.js

## Resumen de la sesión

En esta sesión se ha retomado el ejercicio 3 de la sesión 6 (pizarra colaborativa) y se ha ampliado con un nuevo tipo de usuario: el **administrador**.

Se han diferenciado dos roles en la aplicación:

- **Usuario normal**: puede dibujar, ver su propio cursor y los trazos del resto de usuarios normales.
- **Administrador**: solo puede observar los trazos de los usuarios normales; no puede dibujar ni ve su propio cursor.

El servidor se ha modificado para gestionar esta diferenciación, enviando los eventos de dibujo únicamente a los usuarios que deben recibirlos.

A continuación, el cliente administrador se ha extraído del proyecto Astro y se ha convertido en una **aplicación independiente** construida con Express y Socket.IO, que se conecta al mismo servidor que el cliente Astro.

---

Por último, se ha presentado el **proyecto final** de la asignatura: [El Laser](PROYECTO.md), un sistema cliente-servidor que controla en tiempo real una pieza visual proyectada mediante luz láser.

Se han introducido los conceptos hardware y software que rodean este ecosistema:

- El hardware láser que se usará en la práctica.
- El **DAC** (Ether Dream) como puente entre el software y el hardware.
- El formato **ILDA** para la representación de datos de proyección láser.
- La librería **`@laser-dac`** de Node.js para enviar datos al DAC.

Se ha hecho un primer *hello world* con `@laser-dac`, enviando una línea horizontal al láser, y se han identificado los primeros problemas de conexión con el dispositivo Ether Dream.

---

## Actividades de la sesión

### Actividad — Roles de usuario en la pizarra colaborativa

Esta actividad amplía el ejercicio de la pizarra colaborativa (sesión 06, actividad 02) introduciendo la distinción entre tipos de usuario mediante Socket.IO.

Los conceptos clave que explora:

- **Gestión de roles en el servidor**: diferenciar qué tipo de cliente es cada socket en el momento de la conexión y qué información puede recibir.
- **Salas de Socket.IO**: agrupar conexiones para enviar eventos solo a un subconjunto de clientes (`socket.join`, `socket.to`).
- **Cliente independiente con Express**: separar el panel de administración del proyecto Astro para convertirlo en una aplicación Node.js autónoma que se conecte al mismo servidor de Socket.IO.
- **Arquitectura multi-cliente**: gestionar desde el servidor varios tipos de clientes conectados simultáneamente con comportamientos distintos.

---

## Conceptos difíciles – Referencias y ejemplos

### Gestión de roles con Socket.IO

Cuando múltiples tipos de clientes se conectan al mismo servidor, es necesario identificar qué rol tiene cada socket para decidir qué eventos puede emitir y cuáles puede recibir.

Una forma habitual es que el cliente envíe un identificador de rol al conectarse, usando el objeto `auth` o un evento inicial:

```js
// Cliente (navegador o Node.js)
const socket = io('http://localhost:3000', {
  auth: { rol: 'admin' }  // o 'usuario'
});
```

En el servidor, el rol queda disponible en `socket.handshake.auth`:

```js
// Servidor
io.on('connection', (socket) => {
  const rol = socket.handshake.auth.rol;

  if (rol === 'admin') {
    socket.join('admins');
  } else {
    socket.join('usuarios');
  }

  socket.on('trazo', (data) => {
    // Solo los admins reciben los trazos de los usuarios
    socket.to('admins').emit('trazo', data);
    // Los demás usuarios también los reciben
    socket.to('usuarios').emit('trazo', data);
  });
});
```

> ⚠️ En producción, los roles deben validarse en el servidor, nunca confiar únicamente en lo que envía el cliente.

Referencias:
- [Autenticación en Socket.IO](https://socket.io/docs/v4/middlewares/#sending-credentials)
- [Salas (rooms) en Socket.IO](https://socket.io/docs/v4/rooms/)

---

### El formato ILDA y la cadena software → hardware

Controlar un láser desde código implica entender la cadena completa entre el software y el hardware físico. Los tres eslabones principales son:

1. **Software** (Node.js + librería): genera puntos con coordenadas y color.
2. **DAC** (convertidor digital-analógico, p. ej. Ether Dream): recibe los puntos por red y los convierte en señales eléctricas analógicas.
3. **Proyector láser**: recibe las señales analógicas y mueve los espejos galvanométricos para dibujar.

El formato **ILDA** (*International Laser Display Association*) define cómo se representan los puntos que el láser debe dibujar. Cada punto describe su posición (X, Y) y su color (R, G, B), normalmente con valores normalizados entre 0 y 1 o entre -1 y 1 dependiendo de la librería.

Referencia:
- [Especificación ILDA (PDF oficial)](https://www.ilda.com/resources/StandardsDocs/ILDA_ISP14_rev002.pdf)
- [Repositorio `@laser-dac` en GitHub](https://github.com/laser-dac/laser-dac)

---

### La librería `@laser-dac`

`@laser-dac` es un conjunto de paquetes de Node.js que permite enviar escenas de puntos a un DAC compatible con ILDA. Está organizada de forma modular:

| Paquete | Función |
| --- | --- |
| `@laser-dac/core` | Núcleo: gestiona el DAC y el streaming de escenas |
| `@laser-dac/ether-dream` | Driver para el DAC Ether Dream (conexión por red) |
| `@laser-dac/draw` | Utilidades para generar puntos (líneas, curvas, formas) |
| `@laser-dac/simulator` | Simulador en canvas para probar sin hardware físico |

**Ejemplo básico — línea horizontal roja:**

```js
import { DAC } from "@laser-dac/core";
import { EtherDream } from "@laser-dac/ether-dream";

const dac = new DAC();
dac.use(new EtherDream());

const started = await dac.start();
if (started) {
  const pps = 30000; // puntos por segundo

  const scene = {
    points: [
      { x: 0.1, y: 0.5, r: 1, g: 0, b: 0 },
      { x: 0.9, y: 0.5, r: 1, g: 0, b: 0 },
    ],
  };

  dac.stream(scene, pps);
}
```

> ⚠️ Durante las pruebas se observó que enviar muy pocos puntos (solo 2) puede provocar inestabilidad en el DAC, que reinicia la conexión al cabo de ~500 ms. Es recomendable enviar un número mínimo de puntos suficiente para mantener la señal estable; la documentación del hardware suele indicar el valor mínimo recomendado.

**Simulador (sin hardware):**

Para desarrollar sin el láser físico, se puede usar `@laser-dac/simulator`, que muestra la escena en una ventana de canvas:

```js
import { DAC } from "@laser-dac/core";
import { Simulator } from "@laser-dac/simulator";

const dac = new DAC();
dac.use(new Simulator());

await dac.start();
// El resto del código es idéntico al ejemplo con EtherDream
```

Referencias:
- [Documentación de `@laser-dac`](https://github.com/laser-dac/laser-dac#readme)
- [Ether Dream DAC](https://ether-dream.com/)

---

### Arquitectura de tres capas con Socket.IO

El proyecto final introduce una arquitectura de **tres participantes** conectados en cadena:

```
[Cliente web Astro]  →  [Servidor Node.js + Socket.IO]  →  [Cliente Node.js externo]
```

El cliente externo no es un navegador sino un proceso Node.js que actúa simultáneamente como cliente de Socket.IO (hacia el servidor) y como controlador del hardware láser. Esta separación permite:

- Desacoplar la interfaz de usuario del control del hardware.
- Sustituir el simulador por hardware real sin modificar el cliente web ni el servidor.
- Escalar o reutilizar cada parte de forma independiente.

**Ejemplo: cliente Node.js externo que recibe datos del servidor:**

```js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Cliente externo conectado:", socket.id);
});

socket.on("trazo", (data) => {
  console.log("Trazo recibido:", data);
  // Aquí se procesarían los datos para enviarlos al DAC
});
```

> 💡 Este cliente externo es el puente entre el mundo web (tiempo real, eventos) y el mundo físico (hardware, señales analógicas). Su diseño determina la calidad y latencia de la salida.

Referencias:
- [Socket.IO Client para Node.js](https://socket.io/docs/v4/client-installation/#nodejs)
- [Enunciado del proyecto — El Laser](PROYECTO.md)
