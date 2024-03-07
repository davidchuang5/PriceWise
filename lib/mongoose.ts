import mongoose from 'mongoose';

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  //mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined');

  if (isConnected) return console.log('=> using existing database connection');

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log(`MongoDB Connected, ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Connection failed', error);
  }
};
