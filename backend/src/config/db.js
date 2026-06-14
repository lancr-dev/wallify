import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected successfuly: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connnection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectMongoDB;
