const functions = require("firebase-functions");
const multer = require("multer");
const express = require("express");
const cors = require("cors");

// middleware
const upload = multer();
const app = express();
app.use(cors({ origin: true }));

// Dummy scoring (later replace with Whisper/Azure API call)
app.post("/assessPronunciation", upload.single("audio"), async (req, res) => {
  try {
    const audioBuffer = req.file.buffer; // raw audio
    console.log("Received audio size:", audioBuffer.length);

    // TODO: send audioBuffer to Whisper/Azure here
    // For local test, return fake results
    res.json({
      ok: true,
      transcript: "the quick brown fox jumps over the lazy dog",
      wer: 0.1,
      wordScores: [
        { target: "the", said: "the", status: "ok" },
        { target: "quick", said: "quick", status: "ok" },
        { target: "brown", said: "brown", status: "ok" },
        { target: "fox", said: "box", status: "sub" },
        { target: "jumps", status: "missed" }
      ]
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: String(e) });
  }
});

exports.assessPronunciation = functions.https.onRequest(app);
