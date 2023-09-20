import express from "express";
import morgan from "morgan";

const app = express();
const port = 4000;
const logger = morgan("dev");

const home = (req, res) => res.send("Hello World!");

app.use(logger);
app.get("/", home);

const handleListening = () => {
  console.log(`✅Server listening on port http://localhost:${port}`);
};

app.listen(port, handleListening);
