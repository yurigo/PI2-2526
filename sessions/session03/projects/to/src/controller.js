import * as dao from "./artists.dao.js";

export function welcome(req, res) {
      res.send(
        "<a href='http://localhost:3000/artists'>Acceder a Spotify:</a>",
      );
}

export function getAllArtists(req, res){
  // res.json(artists);
  res.json(dao.getAll());
}

export function getArtistByID(req, res){
    
    const idArtist = Number(req.params.idArtist);


    // const found = artists.find((e) => e.id === idArtist);
    const found = dao.findArtistById(idArtist);

    if (!found) {
        return res.status(404).json({ error: "Artista no encontrado" });
    }

    // const songsCount = songs.filter(song => song.idArtist === idArtist).length;
    
    // found.songsCount = dao.countSongsByArtistId(idArtist);

    res.status(200).json(found);
}

export function createArtist(req, res) {
    const newArtist = req.body;
    // const Maxid = artists.map((element) => element.id);
    // const max = Math.max(...Maxid);
    // newArtist.id = max + 1;

    // validaciones!!
    if (!newArtist.name || newArtist.name.trim() === "") {
        return res.status(400).json({ error: "Nombre requerido" });
    }

    newArtist.id = dao.createArtist(newArtist);;

    // artists.push(newArtist);
    res.status(201).json(newArtist);
}

export function updateArtist(req, res){
    const newData = req.body;
    const id = req.params.idArtist

    // validaciones
    // datos de entrada
    if (!newData.name || newData.name.trim() === "") {
        return res.status(400).json({ error: "Nombre requerido" });
    }

    if (!dao.updateArtist(id, newData)){
        return res.status(404).json({error: "artista no encontrado"});
    }
    
    return res.status(200).json(newData);
}

export function deleteArtist(req,res){
    const id = req.params.idArtist
  
    // si existe
    // const found = dao.findArtistById(id);
    // if (!found) return res.status(404).json({wtf: "wtf"});

    if (!dao.deleteArtist(id))
        return res.status(404).json({error: "artista no encontrado"})


    res.status(200).json({deleted: true});
}