/**
 * Q7: Backend server to save feedback form contents to a file.
 *
 * How to run:
 * 1) Open terminal in project root
 * 2) npm init -y
 * 3) npm i express cors
 * 4) node backend/server.js
 *
 * This will start: http://localhost:3001
 * Feedback will be saved to: backend/feedback.txt
 */

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const feedbackFile = path.join(__dirname, "feedback.txt");

app.post("/feedback", (req, res) => {
  const { name, phone, email, message } = req.body || {};

  // Basic server-side validation (always validate on backend too)
  if (!name || !phone || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing fields" });
  }

  const entry =
    `----- FEEDBACK -----\n` +
    `Time: ${new Date().toLocaleString()}\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Email: ${email}\n` +
    `Message: ${message}\n\n`;

  fs.appendFile(feedbackFile, entry, err => {
    if (err) {
      return res.status(500).json({ ok: false, error: "Failed to save feedback" });
    }
    return res.json({ ok: true });
  });
});

app.get("/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Feedback server running on http://localhost:${PORT}`);
});

