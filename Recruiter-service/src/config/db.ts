import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbURI = process.env.DB as string;
    await mongoose.connect(dbURI);
    console.log("Connected to the MongoDB database");
  } catch (error) {
    console.error("Error connecting to the MongoDB database:", error);
    process.exit(1);
  }
};

export default connectDB;
