import mongoose from 'mongoose';

<<<<<<< HEAD
let isConnected = false; // Variable to track the connection status
=======
let isConnected = false; // Varibale to track connection status
>>>>>>> 5085a9b7df8502517563722c3e7b516ae0702e3f

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

<<<<<<< HEAD
  if (!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined');

  if (isConnected) return console.log('=> using existing database connection');
=======
  if (!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined in env file');

  if (isConnected) return console.log('Connected to MongoDB');
>>>>>>> 5085a9b7df8502517563722c3e7b516ae0702e3f

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;
<<<<<<< HEAD

    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
  }
=======
    console.log('Connected to MongoDB');
  } catch (error: any) {}
>>>>>>> 5085a9b7df8502517563722c3e7b516ae0702e3f
};
