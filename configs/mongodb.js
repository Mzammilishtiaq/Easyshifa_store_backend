import mongoose, { mongo } from "mongoose";

const mongoDBConnect= async () => {
  await mongoose.connect("mongodb://localhost:27017/easyshifa")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));
  
}

export default mongoDBConnect;