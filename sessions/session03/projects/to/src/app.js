import express from "express";
import chalk from "chalk";
import cors from "cors";

import { welcome, getAllArtists, getArtistByID, createArtist, updateArtist, deleteArtist } from "./controller.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", welcome);
app.get("/artists", getAllArtists);
app.get("/artists/:idArtist", getArtistByID);
app.post("/artists", createArtist);
app.put("/artists/:idArtist", updateArtist);
app.delete("/artists/:idArtist", deleteArtist);

app.listen(3000, () => {
    console.log(chalk.blue("http://localhost:3000"));
});