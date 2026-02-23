*** Como arrancar el servidor: ***
Para poder arrancar el servidor lo primero que se debe realizar es pulsar la tecla Ctrl (Control) y mantenerla pulsada, seguidamente mientras se mantiene esta tecla pulsada se debe pulsar la tecla "Ñ". En ese preciso instante se abrirá la terminal donde para ejecutar el servidor se deberá introducir el siguiente comando: "npm run dev". Una vez introducido el comando, se deberá pulsar el link que aparece en azul como: "http://localhost:3000".


*** Endpoints ***
GET /artists [Lista todos los artistas].
GET /artists/:idArtist [Obtiene un artista y su número de canciones].
POST /artists [Crear un nuevo artista].
PUT /artists/:idArtist [Actualiza la información de un artista].
DELETE /artists/:idArtist [Elimina un artista].
GET /artists/:idArtist/songs [Lista de canciones de un artista].
GET /artists/:idArtist/songs/:idSong [Obtiene una canción específica de un artista].
POST /artists/:idArtist/songs [Crea una canción para un artista].
PUT /artists/:idArtist/songs/:idSong [Actualiza la canción de un artista].
DELETE /artists/:idArtist/songs/:idSong [Elimina la canción de un artista].


*** Screenshots ***
Post de un artista --> REQ: ![alt text](/img/image.png) ---> RES: ![alt text](/img/image-1.png)
Post de una canción para un artista --> REQ: ![alt text](/img/image-2.png) --> RES: ![alt text](/img/image-3.png)
Get songs de un artista --> REQ & RES: ![alt text](/img/image-5.png)
Put de una song --> REQ: ![alt text](/img/image-4.png) --> RES: ![alt text](/img/image-6.png)
Delete de una canción --> REQ: ![alt text](/img/image-7.png) --> RES: ![alt text](/img/image-8.png) // ![alt text](/img/image-9.png)