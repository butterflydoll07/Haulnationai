import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { StacyAI } from "./stacyAI.js";
import { AxelAI } from "./axelAI.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*" }));

const stacy = new StacyAI();
const axel = new AxelAI();

app.post("/api/stacy", (req, res) => {
  const { message } = req.body;
  res.json({ reply: stacy.reply(message) });
});

app.post("/api/axel", (req, res) => {
  const { message } = req.body;
  res.json({ reply: axel.reply(message) });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend running on :${PORT}`));
