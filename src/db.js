import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ DB connected");
const handleError = (err) => console.log("❌ DB Error", err);

db.on("error", handleError);
db.once("open", handleOpen);
