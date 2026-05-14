import mongoose from "mongoose";

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected Successfully ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1);
  }
}

export default connectDB;
