Se han expuesto cliente + servidor del ejercicio session06/ENUNCIADO-03.md de los alumnos que han venido a clase.

Se ha hecho el deploy del cliente de un ejercicio de un alumno a Vercel.
Se han corregido los errores que no permitian el deploy.
Se han creado un tunnel del server del ejercicio de un alumno vía PORTS forwarding del vs studio.


Se ha explorado otra solución:  Render.com como hosting de un servidor de socket.io (gratuito) para alojar el servidor.

Se ha trabajado el clase esta arquitectura:

cliente->astro->vercel
server->node+express+socket.io->render

Cada alumno ha tenido que separar cliente y servidor de su ejercicio (si no lo tenian separado) en repositorios de github separados.

Se ha utilizado render para conectarlo al repositorio del servidor y via CI/CD se ha deployado a una url pública.
Se ha utilizado vercel para conectarlo al repositorio del cliente y via CI/CD se ha deployado a una url pública.

Se ha modificado el cliente para que apunte al servidor público.

Se ha explicado la arquitectura en la pizarra y resuelto dudas.


Se ha presentado el futuro proyecto en el que habrán:

clientes (jugadores) + clientes (admin) + servidor.

se hará en tiempo real y se necesitará socket.io.

El cliente (por ahora) moverá el cursores y el servidor mantendrá la información (coordenadas de los jugadores).

el admin verá en tiempo real las posiciones de los cursores  y en un futuro se conectará a un laser (Laserworld DS-1000RGB MK5) y pintará en tiempo real las ubicaciones.