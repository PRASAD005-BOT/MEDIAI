import mongoose from "mongoose";

// Do not use '@' symbol in your database user's password; otherwise, it will cause an error.
// Instead, URL-encode it if your password contains special characters.

const connectDB = async () => {
  mongoose.connection.on('connected', () => console.log("Database Connected"));

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'prescripto', // Set the database name here
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;
