import { model, Schema, Types } from "mongoose";

const musicSchema = new Schema({
   name: { type: String, required: true },
   duration: { type: String },
   album: { type: Types.ObjectId, ref: "Album" }
});

export const MusicModel = model("Music", musicSchema);