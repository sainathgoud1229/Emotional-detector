// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { detectEmotion } = require("./classifier");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// API endpoint
app.post("/detect", (req, res) => {
  const { text } = req.body;
  if (typeof text !== "string") return res.status(400).json({ error: "Provide { text: '...' } in JSON body" });

  const result = detectEmotion(text);
  res.json({ text, ...result });
});

// Optional: serve frontend static files if you want
// Place compiled frontend files in ../frontend and uncomment below:
// app.use(express.static(path.join(__dirname, "../frontend")));
// app.get("/", (req,res) => res.sendFile(path.join(__dirname, "../frontend/index.html")));

app.listen(PORT, () => {
  console.log(`Emotional Detector API listening on http://localhost:${PORT}`);
});
