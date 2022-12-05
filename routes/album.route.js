import express from "express";
import { AlbumModel } from "../model/album.model.js";
import { MusicModel } from "../model/music.model.js";

const albumRouter = express.Router();

albumRouter.post("/", async (request, response) => {
   try {

      const newAlbum = await AlbumModel.create(request.body);

      return response.status(201).json(newAlbum);

   } catch (error) {
      console.log(error);
      return response.status(500).json(error);
   }
});

albumRouter.get("/", async (request, response) => {
   try {

      const allAlbums = await AlbumModel.find({});
      return response.status(200).json(allAlbums);

   } catch (error) {
      console.log(error);
      return response.status(500).json(error);
   }
});

albumRouter.get("/:albumId", async (request, response) => {
   try {

      const album = await AlbumModel.findOne(
         { _id: request.params.albumId }
      ).populate("musics");

      return response.status(200).json(album);

   } catch (error) {
      console.log(error);
      return response.status(500).json(error);
   }
});


albumRouter.patch("/:albumId", async (request, response) => {
   try {

      delete request.body._id;

      const newAlbum = await AlbumModel.findOneAndUpdate(
         { _id: request.params.albumId },
         { ...request.body },
         { new: true, runValidators: true }
      );

      return response.status(200).json(newAlbum);

   } catch (error) {
      console.log(error);
      return response.status(500).json(error);
   }
});

albumRouter.delete("/:albumId", async (request, response) => {
   try {

      const deletedAlbum = await AlbumModel.findOne({ _id: request.params.albumId });

      await MusicModel.deleteMany({ album: request.params.albumId });

      await AlbumModel.findOneAndDelete({ _id: request.params.albumId });

      return response.status(200).json({ msg: "Album deletado com sucesso!" });

   } catch (error) {
      console.log(error);
      return response.status(500).json(error);
   }
});

export { albumRouter };