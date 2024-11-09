import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
  } catch (e) {
    console.log(e);
  }
};

export default connectDB;
