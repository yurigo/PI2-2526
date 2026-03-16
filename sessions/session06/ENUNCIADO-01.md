# Chat en tiempo real con Socket.IO

## Objetivo

En esta actividad desarrollarás un **chat en tiempo real** utilizando:

-   **Node.js + Express** para el backend
-   **Socket.IO** para la comunicación en tiempo real
-   **Astro** para el frontend

El objetivo es entender cómo funciona la comunicación **bidireccional
entre cliente y servidor** mediante eventos.

------------------------------------------------------------------------

## Requisitos

Tu aplicación debe permitir:

1.  Introducir un **nombre de usuario** al entrar al chat.
2.  Enviar **mensajes en tiempo real**.
3.  Mostrar los mensajes enviados por todos los usuarios conectados.
4.  Mostrar cuando un usuario **entra o sale del chat**.

Todos los usuarios conectados deben ver los mensajes
**instantáneamente**, sin recargar la página.

------------------------------------------------------------------------

## Requisitos técnicos

### Backend

Debes crear un servidor con:

-   `Node.js`
-   `Express`
-   `Socket.IO`

El servidor debe:

-   aceptar conexiones de clientes
-   recibir mensajes
-   retransmitirlos a todos los usuarios conectados

------------------------------------------------------------------------

### Frontend

Debes usar **Astro** para construir la interfaz.

La página debe contener:

-   campo para nombre de usuario
-   lista de mensajes
-   campo para escribir mensajes
-   botón para enviar

La comunicación con el servidor debe realizarse mediante **Socket.IO
client**.

------------------------------------------------------------------------

## Mejoras

Añade algo como:

-   timestamps en los mensajes
-   lista de usuarios conectados
-   indicador de "usuario está escribiendo..."
-   estilos personalizados
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
