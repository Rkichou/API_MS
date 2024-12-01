import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  try {
    console.log("Connecting to the database User...");
    const mongoUrl =
      process.env.MONGO_PRODUCTS ||
      "mongodb://products-db:27017/MicroService-Products";
    if (!mongoUrl) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    const conn = await mongoose.connect(mongoUrl);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("An unknown error occurred");
    }
    throw error; // Lever une exception au lieu d'appeler process.exit(1)
  }
};

export default connectDB;
