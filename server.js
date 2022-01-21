const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const dino = require("./models/dino.js");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (_, response) => {
  response.send("Hello!");
});

app.get("/dinos", (_, response) => {
  response.json(dino);
});

app.get("/dinos/:id", (request, response) => {
  const { id } = request.params;
  if (!dino[id]) {
    response.redirect("/404");

    return;
  }

  response.json(dino[id]);
});

app.get("/404", (_, response) => {
  response.status(404).json({ error: "Resource not found." });
});

app.get("*", (_, response) => {
  response.redirect("/404");
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
