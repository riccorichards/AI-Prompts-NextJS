import mongoose from "mongoose";

let isConnected = false;

const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDB = async () => {
  mongoose.set("strict", true);
  if (isConnected) return "MongoDB is already connected";

  if (typeof MONGODB_URI === "undefined") return "No MongoDB URL provided";

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "ai-prompt",
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
