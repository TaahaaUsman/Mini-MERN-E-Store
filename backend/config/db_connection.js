import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGODB_URI);
    console.log("Database is Connected");
  } catch (err) {
    console.log("Error in Database Connection", err.message);
  }
};

export default connectDB;
