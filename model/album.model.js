import { model, Schema, Types } from "mongoose";

const albumSchema = new Schema({
   artist: { type: String, required: true },
   release_date: { type: Date },
   name: { type: String, required: true },
   musics: [{ type: Types.ObjectId, ref: "Music" }]
});

export const AlbumModel = model("Album", albumSchema);