import mongoose from 'mongoose';

let isConnected = false; // Varibale to track connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined in env file');

  if (isConnected) return console.log('Connected to MongoDB');

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error: any) {}
};
