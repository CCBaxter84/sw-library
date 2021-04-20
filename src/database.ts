// Import dependencies
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

// Define database vars
const db: string = process.env.MONGO_URI || "";
const dbParams = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// Connect to DB and export connection
export const connectToDB = (): void => {
  mongoose
    .connect(db, dbParams)
    .then(() => console.log("Connected to DB"))
    .catch(() => console.log("Error connecting to DB"));

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from DB");
  });
}