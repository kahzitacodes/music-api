import express from "express";
import { MusicModel } from "../model/music.model.js";
import { AlbumModel } from "../model/album.model.js";

const musicRouter = express.Router();

musicRouter.post("/:albumId", async (request, response) => {
   try {

      const newMusic = await MusicModel.create({
         ...request.body,
         album: request.params.albumId
      });

      await AlbumModel.findOneAndUpdate(
         { _id: request.params.albumId },
         { $push: { musics: newMusic._doc._id } },
         { runValidators: true }
      );

      return response.status(201).json(newMusic);

   } catch (error) {
      console.log(error);
      return response.status(500).json(error);
   }
});

musicRouter.get("/:musicId", async (request, response) => {
   try {

      const musicDetails = await MusicModel.findOne({ _id: request.params.musicId });

      return response.status(200).json(musicDetails);

   } catch (error) {
      console.log(error);
      return response.status(500).json(error);
   }
});

musicRouter.delete("/:musicId", async (request, response) => {

   try {
      const musicDetails = await MusicModel.findOne({ _id: request.params.musicId });
      const musicAlbum = await AlbumModel.findOne({ _id: musicDetails._doc.album });

      await AlbumModel.findOneAndUpdate(
         { _id: musicAlbum._id },
         { $pull: { musics: musicDetails._id } },
         { new: true }
      );

      await MusicModel.findOneAndDelete({ _id: musicDetails });

      return response.status(200).json(musicAlbum);

   } catch (error) {
      console.log(error);
      return response.status(500).json(error);
   }

});

export { musicRouter };