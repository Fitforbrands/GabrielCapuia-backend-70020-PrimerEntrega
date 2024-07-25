import mongoose from "mongoose";
import envs from "./envsconfig.js";

export const connectMongoDB = async () => {
  try {
    mongoose.connect(envs.MONGO_URL);
    console.log("MongoDB Conectado");
  } catch (error) {
    console.log("error");
  }
};
