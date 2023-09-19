import express from "express";

const app = express();
const port = 4000;

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
const protectormiddleware = (req, res, next) => {
  if (req.url === "/protect") {
    res.send("<h1>not allowed</h1>");
  }
  next();
};
const home = (req, res) => res.send("Hello World!");

app.use(logger);
app.use(protectormiddleware);
app.get("/", home);
app.get("/protect", (req, res) => {
  res.send("this is protect");
});

const handleListening = () => {
  console.log(`✅Server listening on port http://localhost:${port}`);
};

app.listen(port, handleListening);
