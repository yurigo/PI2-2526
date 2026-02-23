import songs from "./songs.js";

export function findSongByArtist(songId, artistId){
    return songs.find(song => song.id === songId && song.idArtist === artistId);
}