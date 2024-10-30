import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://order-db:27017/MicroService-Orders",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected successfully to:", mongoose.connection.host);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Terminate the process if connection fails
  }
};

// Helper function to ensure the database is connected
export const ensureDatabaseConnection = async () => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(
        process.env.MONGO_URI ?? "mongodb://order-db:27017",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
    } catch (error) {
      console.error("Error ensuring database connection:", error);
      throw error;
    }
  }
};

export default connectDB;
