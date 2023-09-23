import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/youtube");

const db = mongoose.connection;

const handleOpen = () => console.log("✅ DB connected");
const handleError = (err) => console.log("❌ DB Error", err);

db.on("error", handleError);
db.once("open", handleOpen);
