-- SQLite

CREATE TABLE artists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);

CREATE TABLE songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    duration INTEGER,
    idArtist INTEGER,
    FOREIGN KEY (idArtist) REFERENCES artists(id)
);