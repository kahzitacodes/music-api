import * as dotenv from "dotenv";
import express from "express";
import { dbConnection } from "./config/db.config.js";
import { albumRouter } from "./routes/album.route.js";
import { musicRouter } from "./routes/music.route.js";

dotenv.config();
dbConnection();
const app = express();

app.use(express.json());
app.use("/album", albumRouter);
app.use("/music", musicRouter);

app.listen(Number(process.env.PORT), () => {
   console.log(`Server running and up on port ${process.env.PORT}`);
});