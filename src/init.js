import "dotenv/config";
import "./db";
import "./models/videoModel";
import "./models/userModel";
import app from "./server";

const port = 4000;

const handleListening = () => {
  console.log(`✅ Server listening on port http://localhost:${port}`);
};

app.listen(port, handleListening);
