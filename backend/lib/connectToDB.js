import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "sitemate",
    });
    isConnected = true;
    console.log("=> new database connection");
  } catch (error) {
    console.log("=> error connecting to database:", error);
  }
};
