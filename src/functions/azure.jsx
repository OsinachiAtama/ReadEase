const fetch = require("node-fetch");

async function assessPronunciationAzure({ audioBytes, referenceText, key, region }) {
  const endpoint = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`;
  const headers = {
    "Ocp-Apim-Subscription-Key": key,
    "Content-Type": "audio/webm",
    "Pronunciation-Assessment": Buffer.from(JSON.stringify({
      ReferenceText: referenceText,
      GradingSystem: "HundredMark",
      Granularity: "Phoneme",
      Dimension: "Comprehensive"
    })).toString("base64")
  };

  const resp = await fetch(endpoint, { method: "POST", headers, body: audioBytes });
  if (!resp.ok) throw new Error(await resp.text());
  return resp.json();
}

module.exports = { assessPronunciationAzure };
