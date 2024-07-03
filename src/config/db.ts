import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`Db connected`, conn.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
