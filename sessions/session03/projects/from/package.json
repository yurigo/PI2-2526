import express from "express";
import chalk from "chalk";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let artists = [
    {id: 1, name: "Kanye West"},
    {id: 2, name: "Dave"},
    {id: 3, name: "Travis Scott"},
    {id: 4, name: "SZA"}
];

let songs = [
    {id: 1, idArtist: 1, name: "Ni**as In Paris", duration: 219},
    {id: 2, idArtist: 1, name: "Flashing Lights", duration: 237},
    {id: 3, idArtist: 1, name: "Runaway", duration: 547},
    {id: 4, idArtist: 1, name: "Saint Pablo", duration: 372},
    {id: 1, idArtist: 2, name: "Screwface Capital", duration: 253},
    {id: 2, idArtist: 2, name: "The Boy Who Played the Harp", duration: 277},
    {id: 3, idArtist: 2, name: "Hangman", duration: 234},
    {id: 4, idArtist: 2, name: "Twenty To One", duration: 201},
    {id: 1, idArtist: 3, name: "SICKO MODE", duration: 312},
    {id: 2, idArtist: 3, name: "90210", duration: 339},
    {id: 3, idArtist: 3, name: "FE!N", duration: 191},
    {id: 4, idArtist: 3, name: "MY EYES", duration: 251},
    {id: 1, idArtist: 4, name: "Snooze", duration: 201},
    {id: 2, idArtist: 4, name: "Kiss Me More", duration: 208},
    {id: 3, idArtist: 4, name: "Good Days", duration: 279},
    {id: 4, idArtist: 4, name: "All The Stars", duration: 232}
];

function findArtistById(id) {
    return artists.find(artista => artista.id === id);
}

function findSongByArtist(songId, artistId){
    return songs.find(song => song.id === songId && song.idArtist === artistId);
}

app.get("/", function (req, res) {
  res.send(
    "<a href='http://localhost:3000/artists'>Acceder a Spotify:</a>",
  );
});

app.get("/artists", function(req, res){
  res.json(artists);

  
});

app.get("/artists/:idArtist", function(req, res){
    
    const idArtist = Number(req.params.idArtist);


    const found = artists.find((e) => e.id === idArtist);

    if (!found) {
        return res.status(404).json({ error: "Artista no encontrado" });
    }

    const songsCount = songs.filter(song => song.idArtist === idArtist).length;
    found.songsCount = songsCount;

    res.status(200).json(found);
});

app.post("/artists", function(req, res) {
    const newArtist = req.body;
    const Maxid = artists.map((element) => element.id);
    const max = Math.max(...Maxid);
    newArtist.id = max + 1;

    if (!newArtist.name || newArtist.name.trim() === "") {
    return res.status(400).json({ error: "Nombre requerido" });
  }
    artists.push(newArtist);
    res.status(201).send("");
});

app.put("/artists/:idArtist", function(req, res){
    const idArtist = Number(req.params.idArtist);
    const newData = req.body;
    const found = artists.find((element) =>{
        return element.id === idArtist;
    });

    if (!newData.name || newData.name.trim() === "") {
    return res.status(400).json({ error: "Nombre requerido" });
  }


    found.name = newData.name;

    res.status(200).send(found);
});

app.delete("/artists/:idArtist", function(req, res){
    const idArtist = Number(req.params.idArtist);

     const artist = findArtistById(idArtist);
    if (!artist) {
        return res.status(404).json({ error: "Artista no encontrado" });
    }

    const found = artists.find((e) => e.id === idArtist);
    artists = artists.filter((e) => e.id !== idArtist);

   
    res.status(200).send(found);
});

app.get("/artists/:idArtist/songs", function(req, res){
    const canciones = songs.filter(function(song){
        return song.idArtist === Number(req.params.idArtist);
    });

    const idArtist = Number(req.params.idArtist);
    const artist = findArtistById(idArtist);
    if(!artist){
        return res.status(404).json({error: "Artitsta no encontrado"});

    }

    res.status(200).send(canciones);
    
});


app.get("/artists/:idArtist/songs/:idSong", function(req,res){
const idArtist = Number(req.params.idArtist);
    const idSong = Number(req.params.idSong);
    

    const artist = findArtistById(idArtist);
    if (!artist) {
        return res.status(404).json({ error: "Artista no encontrado" });
    }
    
  
    const song = findSongByArtist(idSong, idArtist);
    if (!song) {
        return res.status(404).json({ error: "Canción no encontrada para este artista" });
    }
    
  
    res.status(200).json(song);
});

app.post("/artists/:idArtist/songs", function(req, res){
    const idArtist = Number(req.params.idArtist);

    const artist = findArtistById(idArtist);
    if (!artist) {
        return res.status(404).json({ error: "Artista no encontrado" });
    }

    const newSong = req.body;
    const MaxSongid = songs.map((element) => element.id);
    const max = Math.max(...MaxSongid);
    newSong.id = max + 1;
    newSong.idArtist = idArtist;

    if (!newSong.name || newSong.name.trim() === "") {
    return res.status(400).json({ error: "Nombre requerido" });
  }
  const dur = Number(newSong.duration);
  if (isNaN(dur) || dur <= 0) {
    return res.status(400).json({ error: "Duración inválida" });
  }


    songs.push(newSong);
    res.status(201).json("");
    


});

app.put("/artists/:idArtist/songs/:idSong", function(req, res){
        const idArtist = Number(req.params.idArtist);
        const idSong = Number(req.params.idSong);
        
        const newData = req.body;
        

        const artist = findArtistById(idArtist);
    if (!artist) {
        return res.status(404).json({ error: "Artista no encontrado" });
    }

    const song = findSongByArtist(idSong, idArtist);
    if (!song) {
        return res.status(404).json({ error: "Canción no encontrada para este artista" });
    }

    if (!newData.name || newData.name.trim() === "") {
    return res.status(400).json({ error: "Nombre requerido" });
  }
  const dur = Number(newData.duration);
  if (isNaN(dur) || dur <= 0) {
    return res.status(400).json({ error: "Duración inválida" });
  }

 
    song.name = newData.name;
    song.duration = newData.duration;

    res.status(200).send(song);

});


app.delete("/artists/:idArtist/songs/:idSong", function(req, res){
    const idArtist = Number(req.params.idArtist);
    const idSong = Number(req.params.idSong);


    const artist = findArtistById(idArtist);
    if (!artist) {
        return res.status(404).json({ error: "Artista no encontrado" });
    }

    const song = findSongByArtist(idSong, idArtist);
    if (!song) {
        return res.status(404).json({ error: "Canción no encontrada para este artista" });
    }

    

    songs = songs.filter((e) => !(e.id === idSong && e.idArtist === idArtist));

    res.status(200).send(song);


});



app.listen(3000, () => {
  console.log(chalk.blue("http://localhost:3000"));
});