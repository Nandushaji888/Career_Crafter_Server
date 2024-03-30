import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("entered auth connect db");
    await mongoose.connect("mongodb://127.0.0.1:27017/CareerCrafter-user-service");
    console.log("Connected to the MongoDB database");
  } catch (error) {
    console.error("Error connecting to the MongoDB database:", error);
    process.exit(1);
  }
};

export default connectDB;
