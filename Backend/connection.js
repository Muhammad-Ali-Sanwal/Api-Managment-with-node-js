import mongoose from "mongoose";

export const ConnectDB = async () => {
  const MONGO_URI = "mongodb://localhost:27017";
  try {
    await mongoose
      .connect(MONGO_URI)
      .then(() => console.log("Connected to db Successfully"))
      .catch((error) => console.log(error.message));
  } catch (error) {
    console.log("Error while connecting DB: ", error.message);
    process.exit(1);
  }
};
