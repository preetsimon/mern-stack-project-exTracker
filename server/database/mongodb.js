import mongoose from "mongoose";

// await mongoose 
//   .connect(
//     "mongodb+srv://admin:admin@cluster1.k1ucxgt.mongodb.net/?retryWrites=true&w=majority"
//   );
// console.log("Mongo Connected");

// wait for the mongo connection and then start the server
async function connect() {
  const username = process.env.MONGO_DB_USERNAME;
  const passport = process.env.MONGO_DB_PASSWORD;
  const url = process.env.MONGO_DB_URL;

  await mongoose.connect(
    `mongodb+srv://admin:admin@cluster1.k1ucxgt.mongodb.net/?retryWrites=true&w=majority`
  );
  console.log("MongoDB connection is successful");
}

export default connect;
