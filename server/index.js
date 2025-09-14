// server/index.js (ESM; your package.json has "type":"module")
// @ts-nocheck
import fetch from "node-fetch";
import express from "express";
import multer from "multer";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import { Readable, PassThrough } from "stream";
import "dotenv/config";
import cors from "cors";
import { combinedAccuracy } from "./metrics.js"; 


console.log("Beginning")
const app = express();

// allow requests from your frontend
app.use(cors());

// handle preflight requests
// app.options("/*", cors());
console.log("Whyyyy")
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});


// Point fluent-ffmpeg to the static ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegPath);

// const app = express();
// app.use(cors());
// app.options("*", cors());
const upload = multer();

// ---------- helpers ----------
function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
function tokens(s) {
  return normalize(s).split(" ").filter(Boolean);
}
function wer(target, hyp) {
  const T = tokens(target), H = tokens(hyp);
  const n = T.length, m = H.length;
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = 0; i <= n; i++) dp[i][0] = i;
  for (let j = 0; j <= m; j++) dp[0][j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = T[i - 1] === H[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return n ? dp[n][m] / n : 0;
}

function bufferToStream(buffer) { return Readable.from(buffer); }

async function transcodeToWav16kMono(webmOpusBuffer) {
  return new Promise((resolve, reject) => {
    const input = bufferToStream(webmOpusBuffer);
    const output = new PassThrough();
    const chunks = [];
    output.on("data", (c) => chunks.push(c));
    output.on("end", () => resolve(Buffer.concat(chunks)));
    output.on("error", reject);

    ffmpeg(input)
      .inputFormat("webm")            // MediaRecorder default
      .audioCodec("pcm_s16le")        // 16-bit PCM
      .audioFrequency(16000)          // 16k
      .audioChannels(1)               // mono
      .format("wav")
      .on("error", reject)
      .pipe(output, { end: true });
  });
}
// async function assessWithAzure(wavBuffer, referenceText) {
//   const key = "EbEUpmnNaqypzkDg5TeRmZRxejcKoIyWBxyLF4jmIFDQZEsI48UoJQQJ99BIACYeBjFXJ3w3AAAAACOGRDRf";  // hardcoded key
//   const region = "eastus";           // hardcoded region

//   const endpoint = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`;

//   const paHeader = Buffer.from(JSON.stringify({
//     ReferenceText: referenceText,
//     GradingSystem: "HundredMark",
//     Granularity: "Phoneme",
//     Dimension: "Comprehensive"
//   })).toString("base64");

//   console.log("Azure endpoint:", endpoint);
//  console.log("Azure key exists?", !!key);
//   const resp = await fetch(endpoint, {
//     method: "POST",
//     headers: {
//       "Ocp-Apim-Subscription-Key": key,
//       "Content-Type": "audio/wav",
//       "Pronunciation-Assessment": paHeader
//     },
//     body: wavBuffer
//   });
  

//   if (!resp.ok) {
//     const t = await resp.text();
//     throw new Error(`Azure error ${resp.status}: ${t}`);
//   }

//   const json = await resp.json();
//   const nbest = json.NBest?.[0] || {};
//   const transcript = nbest.Display || nbest.Lexical || "";
//   const pa = nbest.PronunciationAssessment || {};
//   const words = nbest.Words || [];

//   return { transcript, overall: pa, words, dummy: false };
// }
// --- Azure Pronunciation Assessment ---
// async function assessWithAzure(wavBuffer, referenceText) {
//   // 🔑 Hardcoded for hackathon (safe to use .env in production)
//   const key = "EbEUpmnNaqypzkDg5TeRmZRxejcKoIyWBxyLF4jmIFDQZEsI48UoJQQJ99BIACYeBjFXJ3w3AAAAACOGRDRf";
//   const region = "eastus"; // replace with your Azure region

//   if (!key || !region) {
//     throw new Error("Azure key or region is missing!"); // ❌ no dummy fallback
//   }

//   const endpoint = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`;

//   const paHeader = Buffer.from(JSON.stringify({
//     ReferenceText: referenceText,
//     GradingSystem: "HundredMark",
//     Granularity: "Phoneme",
//     Dimension: "Comprehensive"
//   })).toString("base64");

//   console.log("Azure endpoint:", endpoint);

//   const resp = await fetch(endpoint, {
//     method: "POST",
//     headers: {
//       "Ocp-Apim-Subscription-Key": key,
//       "Content-Type": "audio/wav",
//       "Pronunciation-Assessment": paHeader
//     },
//     body: wavBuffer
//   });

//   console.log("Azure status:", resp.status);

//   if (!resp.ok) {
//     const t = await resp.text();
//     console.error("Azure error:", t);
//     throw new Error(`Azure error ${resp.status}: ${t}`);
//   }

//   const json = await resp.json();
//   // console.log("Azure STT result:", JSON.stringify(json, null, 2));

//   const nbest = json.NBest?.[0] || {};
//   const transcript = nbest.Display || "";
//   const pa = nbest.PronunciationAssessment || {};
//   const words = nbest.Words || [];

//   return { transcript, overall: pa, words };
// }
//This is what i added


// --- Azure Speech-to-Text only (no assessment) ---
async function transcribeWithAzure(wavBuffer) {
  const key = "EbEUpmnNaqypzkDg5TeRmZRxejcKoIyWBxyLF4jmIFDQZEsI48UoJQQJ99BIACYeBjFXJ3w3AAAAACOGRDRf";
  const region = "eastus"; // replace with your Azure region

  if (!key || !region) {
    throw new Error("Azure key or region is missing!");
  }

  const endpoint = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`;

  const resp = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Content-Type": "audio/wav"
    },
    body: wavBuffer
  });

  console.log("Azure STT status:", resp.status);

  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Azure STT error ${resp.status}: ${t}`);
  }

  const json = await resp.json();
  console.log("Azure STT result:", JSON.stringify(json, null, 2));
  console.log( json.DisplayText || (json.NBest?.[0]?.Display ?? ""))
  return json.DisplayText || (json.NBest?.[0]?.Display ?? "");
  // const transcript = json.DisplayText || (json.NBest?.[0]?.Display ?? "");
  // return { transcript };
  
}


// ---------- HTTP endpoint ----------
// app.post("/assess-pronunciation", upload.single("audio"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ ok: false, error: "No audio uploaded under 'audio' field." });
//     const referenceText = req.body?.referenceText;
//     if (!referenceText) return res.status(400).json({ ok: false, error: "Missing 'referenceText'." });

//     // 1) Transcode MediaRecorder webm/opus to 16k mono WAV
//     const wav = await transcodeToWav16kMono(req.file.buffer);

//     // 2) Azure assessment
//     const { transcript, overall, words } = await assessWithAzure(wav, referenceText);

//     // 3) Map word scores roughly by position (good enough for demo; timestamp alignment is an upgrade)
//     const targetTokens = referenceText.split(/\s+/);
//     const wordScores = targetTokens.map((t, i) => {
//       const w = words[i];
//       if (!w) return { target: t, status: "missed" };
//       const err = (w.ErrorType || "None");
//       const status = err === "None" ? "ok" : (err === "Omission" ? "missed" : "sub");
//       return { target: t.replace(/[^\w']/g, ""), said: w.Word, status };
//     });

    // 4) WER for an extra sanity metric
//     const scoreWER = wer(referenceText, transcript || "");

//     res.json({
//       ok: true,
//       transcript,
//       wer: scoreWER,
//       overall: overall ? {
//         accuracy: (overall.AccuracyScore ?? 0) / 100,
//         fluency: (overall.FluencyScore ?? 0) / 100,
//         completeness: (overall.CompletenessScore ?? 0) / 100
//       } : undefined,
//       wordScores
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ ok: false, error: String(e) });
//   }
// });

// ---------- start ----------
app.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ ok: false, error: "No audio uploaded" });

    const referenceText = req.body?.referenceText || "";

    const wav = await transcodeToWav16kMono(req.file.buffer);
    const transcript = await transcribeWithAzure(wav);

    let metrics = null;
    console.log("ref text", referenceText, transcript)
    if (referenceText && transcript) {
      metrics = combinedAccuracy(referenceText, transcript); // { combined, werAcc, cerAcc, alignment, missed }
    }

    res.json({
      ok: true,
      transcript,
      metrics // may be null if no referenceText provided
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: String(e) });
  }
});


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Pronunciation server running: http://localhost:${PORT}`);
});
