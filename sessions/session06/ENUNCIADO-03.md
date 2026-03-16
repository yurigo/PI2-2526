# Cursores compartidos en tiempo real

## Objetivo

En esta actividad desarrollarás una aplicación donde los usuarios puedan
ver **los cursores de otros usuarios en tiempo real**.

Cada usuario tendrá un cursor con su **nombre o color**, y todos los
movimientos se reflejarán en las pantallas de los demás usuarios.

La aplicación utilizará:

-   **Node.js + Express**
-   **Socket.IO**
-   **Astro**

------------------------------------------------------------------------

## Requisitos

La aplicación debe:

1.  Detectar la posición del cursor del usuario.
2.  Enviar esa posición al servidor.
3.  Mostrar el cursor de cada usuario conectado.
4.  Eliminar el cursor cuando un usuario se desconecte.

------------------------------------------------------------------------

## Funcionamiento

Cada cliente enviará periódicamente su posición:

    {
      x: number,
      y: number
    }

El servidor retransmitirá la posición a los demás usuarios.

------------------------------------------------------------------------

## Visualización

Cada usuario debe tener:

-   un cursor
-   un color o identificador
-   opcionalmente su nombre

Los cursores pueden representarse con:

-   un círculo
-   un icono
-   un pequeño avatar

------------------------------------------------------------------------

## Consideraciones

Los movimientos del cursor se envían **muy frecuentemente**, por lo que
conviene:

-   limitar la frecuencia de envío
-   evitar saturar el servidor

------------------------------------------------------------------------

## Mejoras

Añade al menos 3 de estas mejoras:

-   nombre de usuario
-   colores aleatorios por usuario
-   animación suave de movimiento
-   contador de usuarios conectados
-   colisiones con confetti en el punto de la colisión
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
