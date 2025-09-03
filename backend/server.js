import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { StacyAI } from "./stacyAI.js";
import { AxelAI } from "./axelAI.js";
import { getRouteSummary, getWeather, getNearbyStops } from "./axelServices.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*" }));

// Bots
const stacy = new StacyAI();
const axel = new AxelAI();

// Optional email (won't send if SMTP not configured)
const emailEnabled = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
const transporter = emailEnabled
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    })
  : null;

async function maybeEmailEscalation(subject, body) {
  if (!emailEnabled) return;
  try {
    await transporter.sendMail({
      to: process.env.ADMIN_EMAIL,
      from: process.env.SMTP_USER,
      subject,
      text: body
    });
  } catch (e) {
    console.error("Email send failed:", e.message);
  }
}

// Health
app.get("/", (_req, res) => res.json({ ok: true, name: "HaulNationAI backend" }));

// Stacy chat
app.post("/api/stacy", async (req, res) => {
  const { message = "" } = req.body;
  const reply = stacy.reply(message);
  if (stacy.shouldEscalate(message)) {
    await maybeEmailEscalation("⚠️ Stacy escalation", `User said:\n${message}\n\nAuto-reply:\n${reply}`);
  }
  res.json({ reply });
});

// Axel chat
app.post("/api/axel", (req, res) => {
  const { message = "" } = req.body;
  const reply = axel.reply(message);
  res.json({ reply });
});

// Axel: route summary
app.post("/api/axel/route", async (req, res) => {
  try {
    const { origin, destination } = req.body;
    if (!origin || !destination) return res.status(400).json({ error: "origin/destination required" });
    const summary = await getRouteSummary(origin, destination);
    res.json(summary);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "route lookup failed" });
  }
});

// Axel: weather
app.get("/api/axel/weather", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "lat/lon required" });
    const w = await getWeather(lat, lon);
    res.json(w);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "weather lookup failed" });
  }
});

// Axel: nearby rest/fuel
app.get("/api/axel/reststops", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "lat/lon required" });
    const stops = await getNearbyStops(lat, lon);
    res.json({ stops });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "rest stop lookup failed" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Backend running on :${PORT}`));
