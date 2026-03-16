# Pizarra colaborativa en tiempo real

## Objetivo

En esta actividad crearás una **pizarra colaborativa** donde varios
usuarios puedan **dibujar simultáneamente en tiempo real**.

Cuando un usuario dibuje en el lienzo, todos los demás usuarios
conectados deberán ver el dibujo inmediatamente.

La aplicación utilizará:

-   **Node.js + Express**
-   **Socket.IO**
-   **Astro**
-   **HTML Canvas**

------------------------------------------------------------------------

## Requisitos

La aplicación debe permitir:

1.  Dibujar sobre un **canvas** con el ratón.
2.  Enviar los trazos al servidor.
3.  Mostrar los trazos en **todos los navegadores conectados** en tiempo
    real.
4.  Permitir **limpiar el canvas**.

------------------------------------------------------------------------

## Requisitos técnicos

### Backend

El servidor debe:

-   aceptar conexiones mediante Socket.IO
-   recibir eventos de dibujo
-   retransmitirlos al resto de usuarios

Ejemplo de eventos:

-   `draw:start`
-   `draw:move`
-   `draw:end`
-   `clear`

------------------------------------------------------------------------

### Frontend

La interfaz debe incluir:

-   un **canvas**
-   un botón **Limpiar**

Cuando el usuario dibuje:

1.  se envía la información del trazo al servidor
2.  el servidor la envía al resto de clientes
3.  todos los clientes dibujan el trazo

------------------------------------------------------------------------

## Información que puede enviarse

Cada evento puede incluir datos como:

    {
      x: number,
      y: number,
      color: string,
      size: number
    }

------------------------------------------------------------------------

## Mejoras

Implementa 1 o 2 mejoras extra:

-   selección de color
-   grosor de línea
-   nombre de usuario
-   guardar el estado del canvas
-   __________________________________________________ <-- ¿se te ocurre alguna mejora mejor? ponla aquí! :D

------------------------------------------------------------------------

## Entrega

La entrega debe incluir un zip con:

-   un README.md con:
    -   las url de los repositorios (cliente + servidor) de los proyectos.
    -   instrucciones para ejecutar el servidor.
    -   instrucciones para ejecutar el cliente.
    -   problemas encontrados y soluciones.
-   el código fuente del cliente.
-   el código fuente del servidor.
