import Database from 'better-sqlite3';

const db = new Database('db.sqlite', { verbose: console.log } );

export function findArtistById(id) {
    const stmt = db.prepare("SELECT * FROM artists WHERE id = ?");
    const artist = stmt.get(id);
    return artist;
}

export function countSongsByArtistId(id){
    return songs.filter(song => song.idArtist === id).length;
}

export function getAll(){
    const stmt = db.prepare(`
        SELECT 
            artists.id as id,
            artists.name as name,
            count(songs.id) as songs,
            sum(songs.duration) as duration
        FROM artists 
        LEFT JOIN songs ON artists.id = songs.idArtist 
        group by artists.id
        `);
    const artists = stmt.all();
    return artists;
}

export function createArtist(artist){
    const stmt = db.prepare("INSERT INTO artists (name) VALUES (?)");
    
    // const valor = stmt.run(artist.name);  // --->  valor = { changes: 1, lastInsertedRowid: 5629874 }
    // const lastInsertRowid = valor.lastInsertRowid;

    const { lastInsertRowid } = stmt.run(artist.name); // deconstrucción de un objeto.

    return lastInsertRowid;
}

export function updateArtist(id, newArtist){
    // const found = findArtistById(id);
    const stmt = db.prepare("UPDATE artists SET name = ? WHERE id = ?");
    const data = stmt.run(newArtist.name , id);

    return data.changes > 0; // ha habido cambios
}

export const deleteArtist = (id) => {
    const stmt = db.prepare("DELETE FROM artists WHERE id = ?");
    const data = stmt.run(id);

    return data.changes > 0;
}