import mongoose from 'mongoose';


const connectDB = async () => {
  try {
   const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
  console.log("MongoDB connection error:", error);
    }
};

export default connectDB;
