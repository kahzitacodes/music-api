import mongoose from "mongoose";

export async function dbConnection() {
   try {

      const db = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`Connected to the database: ${db.connection.name}`);

   } catch (error) {
      console.log(error);
   }
}