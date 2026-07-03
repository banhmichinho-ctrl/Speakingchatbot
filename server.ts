import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Endpoint 1: Generate Examiner Chat Response / Question
app.post("/api/ielts/examiner-chat", async (req, res) => {
  try {
    const { mode, phase, currentPart, candidateName, topicTitle, conversationHistory, candidateLastInput } = req.body;

    const systemPrompt = `You are a certified, professional British IELTS Speaking Examiner conducting an authentic IELTS Speaking Test.
Your tone should be polite, encouraging, formal yet natural.
The test details:
- Candidate Name: ${candidateName || "Candidate"}
- Mode: ${mode} (Full Test or Individual Part)
- Current Test Step: ${phase} (Part 1, Part 2 Prep/Long Turn, or Part 3)
- Topic Area: ${topicTitle || "General IELTS 2026 Topics"}

Instructions for each step:
1. If phase is 'identity_check': Briefly welcome candidate, ask their full name, and ask to check their identity card or passport. Keep it brief (1 sentence).
2. If phase is 'part1': Ask 1 clear, natural IELTS Part 1 question on familiar topics. After candidate answers, acknowledge briefly and ask the next question (or pivot to the next sub-topic if 2-3 questions have been asked).
3. If phase is 'part2_prep': Present the Cue Card with topic title and 4 bullet points. Tell the candidate they have 1 minute to prepare and make notes, then they will speak for 1 to 2 minutes.
4. If phase is 'part2_speech': Ask candidate to begin speaking. After candidate finishes their 1-2 minute long turn, ask 1 brief rounding-off question related to their speech.
5. If phase is 'part3': Ask abstract, analytical Part 3 discussion questions (comparing, predicting 2026/2030 future trends, analyzing causes, weighing pros and cons). Ask probing follow-up questions ("Why do you think that is?", "In what ways might that change in the future?").

Keep your spoken output concise and clear, exactly as a real IELTS Examiner speaks. Do not give away feedback or grades during the test itself.`;

    const contents = [
      { role: "user", parts: [{ text: `Conversation so far:\n${JSON.stringify(conversationHistory || [])}\n\nCandidate's last response: "${candidateLastInput || ""}"\n\nGenerate the examiner's next exact spoken statement.` }] }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const examinerText = response.text || "Thank you. Let's move on to the next question.";
    res.json({ text: examinerText });
  } catch (error: any) {
    console.error("Examiner Chat API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate examiner response" });
  }
});

// API Endpoint 2: Full IELTS Evaluation Engine (Band 1.0 - 9.0 breakdown + Mat Clark & Keith Phrasal Verbs Diagnostic)
app.post("/api/ielts/evaluate", async (req, res) => {
  try {
    const { mode, candidateName, topicTitle, turns, strictness = "strict" } = req.body;

    const evaluationPrompt = `You are an OFFICIAL, FAIR, AND ACCURATE Senior IELTS Speaking Examiner at British Council / IDP.
Your task is to evaluate the candidate's IELTS Speaking test performance according to the official British Council / IDP IELTS Speaking Band Descriptors (Bands 1.0 - 9.0).

CRITICAL REQUIREMENT - SPEECH-TO-TEXT (STT) MISRECOGNITION AWARENESS:
1. The provided transcript was captured using browser Speech-to-Text (STT) audio recognition.
2. STT software frequently introduces phonetic misrecognitions, homophone typos, or missing punctuation (for example:
   - "eat a navy blue blazer" -> Candidate actually said "it's a navy blue blazer"
   - "properly my favorite" -> Candidate actually said "probably my favorite"
   - "small Arabic" -> Candidate actually said "smooth fabric"
   - "house versatile" -> Candidate actually said "how versatile"
   - "set at presentation" -> Candidate actually said "such as presentation"
   - "wide search" -> Candidate actually said "white shirt"
   - "at Paris with a plan t-shirt" -> Candidate actually said "pair it with a plain t-shirt"
   - "displacer" -> Candidate actually said "this blazer"
   - "love loved" or "take my take on" -> minor speech-to-text duplicates or self-corrections)
3. YOU MUST INTELLIGENTLY RECONSTRUCT THE CANDIDATE'S ACTUAL INTENDED WORDS FROM PHONETIC CONTEXT.
4. DO NOT PENALIZE STT TRANSCRIPTION TYPOS AS GRAMMAR OR VOCABULARY ERRORS!
   - Evaluate the candidate's TRUE underlying English capability: fluency, topic-specific vocabulary richness, sentence length, grammatical structures, cohesion, and idea development.

OFFICIAL IELTS BAND DESCRIPTORS GUIDELINES (BE REALISTIC AND FAIR - DO NOT ARTIFICIALLY CAP AT 5.5):
- BAND 7.5 - 8.5: Candidate speaks at length without hesitation, uses rich topic vocabulary (e.g. "navy blue blazer", "versatile", "formal occasions", "presentation ceremonies", "plain t-shirt", "go-to outfit", "make a good impression"), uses complex sentences flexibly, and develops full coherent ideas.
- BAND 6.5 - 7.0: Candidate speaks fluently and at length, uses good vocabulary range with some idiomatic/uncommon expressions, uses a mix of simple and complex structures with good accuracy.
- BAND 5.5 - 6.0: Candidate speaks at length but with noticeable pauses/repetitions, limited vocabulary flexibility, or frequent basic grammatical errors.
- BAND 4.5 - 5.0: Answers are short (only 1-2 simple sentences), frequent long hesitations, very basic vocabulary and simple grammar.

IMPORTANT: LINE-BY-LINE SENTENCE, WORD-BY-WORD IPA & MISPRONUNCIATION ANALYSIS:
For EVERY SINGLE candidate turn provided in the transcript, you MUST produce a "lineByLineAnalysis" item containing:
1. turnIndex: Index of the turn.
2. originalSpokenText: Exact text from transcript.
3. sttFixes: Explanation of STT recognition errors vs candidate's true spoken words.
4. correctedText: Corrected English sentence.
5. upgradedText: Band 8.5+ native speaker sentence upgrade.
6. mispronouncedWords: Array of specific words that candidate mispronounced, swallowed ending sounds, or stressed incorrectly. For each:
   - word: exact word (e.g. "versatile" or "probably" or "helps")
   - spokenPhonetic: phonetic description of error (e.g. "house versatile" or "nuốt âm /-s/")
   - correctIPA: standard British/American IPA notation (e.g. "/ˈvɜː.sə.taɪl/")
   - errorExplanation: detailed explanation in Vietnamese of why it was mispronounced
   - howToFix: step-by-step guidance in Vietnamese on how to pronounce it correctly with mouth shape & stress
7. keyWordsIPA: Array of key vocabulary words with standard IPA transcription and Vietnamese meaning.
8. grammarNotes: Detailed grammatical commentary in Vietnamese.
9. pronunciationNotes: Pronunciation & phonetic advice in Vietnamese (e.g. IPA sound linkage, stress, ending sounds).
10. scoreEstimate: Specific Band score for this particular answer based on actual length, fluency, vocabulary, and grammar.

Candidate Details:
- Candidate Name: ${candidateName || "Candidate"}
- Test Mode: ${mode}
- Topic: ${topicTitle || "General IELTS Practice"}

Full Transcript Turns:
${JSON.stringify(turns, null, 2)}

Return a valid JSON object matching this exact schema:
{
  "overallBand": number (e.g. 7.5, rounded to nearest 0.5),
  "fluencyAndCoherence": {
    "band": number,
    "feedback": "string in Vietnamese acknowledging fluency and flow",
    "strengths": ["string"],
    "improvements": ["string"]
  },
  "lexicalResource": {
    "band": number,
    "feedback": "string in Vietnamese highlighting rich vocabulary used",
    "strengths": ["string"],
    "improvements": ["string"]
  },
  "grammaticalRangeAndAccuracy": {
    "band": number,
    "feedback": "string in Vietnamese evaluating sentence structures accurately",
    "strengths": ["string"],
    "improvements": ["string"]
  },
  "pronunciation": {
    "band": number,
    "feedback": "string in Vietnamese on pronunciation and rhythm",
    "strengths": ["string"],
    "improvements": ["string"]
  },
  "generalSummary": "string in encouraging, professional Vietnamese summarizing overall performance fairly and highlighting key strengths",
  "keyPhrasalVerbsUsed": ["string"],
  "recommendedPhrasalVerbs": ["string"],
  "lineByLineAnalysis": [
    {
      "turnIndex": 1,
      "originalSpokenText": "string",
      "sttFixes": "string",
      "correctedText": "string",
      "upgradedText": "string Band 8.5+",
      "mispronouncedWords": [
        {
          "word": "versatile",
          "spokenPhonetic": "house versatile",
          "correctIPA": "/ˈvɜː.sə.taɪl/",
          "errorExplanation": "Nuốt âm tiết giữa và đọc nhầm trọng âm.",
          "howToFix": "Nhấn mạnh vào âm tiết thứ nhất /ˈvɜː/, bật hơi nhẹ âm /sə/ và kết thúc bằng /taɪl/."
        }
      ],
      "keyWordsIPA": [
        { "word": "blazer", "ipa": "/ˈbleɪ.zər/", "meaningVi": "áo khoác vest nhẹ" }
      ],
      "grammarNotes": "string in Vietnamese",
      "pronunciationNotes": "string in Vietnamese with IPA guidelines",
      "scoreEstimate": 7.5
    }
  ],
  "detailedUpgrades": [
    {
      "originalText": "string from candidate speech",
      "upgradedTextText": "string Band 8.5+ upgraded version",
      "phoneticIPA": "string IPA notation e.g. /ˈvɜː.sə.taɪl/",
      "pronunciationNotes": "string in Vietnamese with IPA guide",
      "explanation": "string in clear Vietnamese explaining constructive ways to upgrade",
      "category": "FC" | "LR" | "GRA" | "PR"
    }
  ],
  "matClarkTechniquesFeedback": {
    "leadInPhrasesUsed": boolean,
    "pointingPhrasesUsed": boolean,
    "situationalContrastUsed": boolean,
    "secondConditionalsUsed": boolean,
    "complexConnectivesUsed": boolean,
    "notes": "string feedback on strategy execution"
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Analyze the speaking performance transcript provided in system instructions and return JSON evaluation.",
      config: {
        systemInstruction: evaluationPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallBand: { type: Type.NUMBER },
            fluencyAndCoherence: {
              type: Type.OBJECT,
              properties: {
                band: { type: Type.NUMBER },
                feedback: { type: Type.STRING },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["band", "feedback", "strengths", "improvements"],
            },
            lexicalResource: {
              type: Type.OBJECT,
              properties: {
                band: { type: Type.NUMBER },
                feedback: { type: Type.STRING },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["band", "feedback", "strengths", "improvements"],
            },
            grammaticalRangeAndAccuracy: {
              type: Type.OBJECT,
              properties: {
                band: { type: Type.NUMBER },
                feedback: { type: Type.STRING },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["band", "feedback", "strengths", "improvements"],
            },
            pronunciation: {
              type: Type.OBJECT,
              properties: {
                band: { type: Type.NUMBER },
                feedback: { type: Type.STRING },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["band", "feedback", "strengths", "improvements"],
            },
            generalSummary: { type: Type.STRING },
            keyPhrasalVerbsUsed: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendedPhrasalVerbs: { type: Type.ARRAY, items: { type: Type.STRING } },
            lineByLineAnalysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  turnIndex: { type: Type.NUMBER },
                  originalSpokenText: { type: Type.STRING },
                  sttFixes: { type: Type.STRING },
                  correctedText: { type: Type.STRING },
                  upgradedText: { type: Type.STRING },
                  mispronouncedWords: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        word: { type: Type.STRING },
                        spokenPhonetic: { type: Type.STRING },
                        correctIPA: { type: Type.STRING },
                        errorExplanation: { type: Type.STRING },
                        howToFix: { type: Type.STRING },
                      },
                      required: ["word", "correctIPA", "errorExplanation", "howToFix"],
                    },
                  },
                  keyWordsIPA: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        word: { type: Type.STRING },
                        ipa: { type: Type.STRING },
                        meaningVi: { type: Type.STRING },
                      },
                      required: ["word", "ipa", "meaningVi"],
                    },
                  },
                  grammarNotes: { type: Type.STRING },
                  pronunciationNotes: { type: Type.STRING },
                  scoreEstimate: { type: Type.NUMBER },
                },
                required: ["turnIndex", "originalSpokenText", "correctedText", "upgradedText", "keyWordsIPA", "grammarNotes", "pronunciationNotes", "scoreEstimate"],
              },
            },
            detailedUpgrades: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  originalText: { type: Type.STRING },
                  upgradedTextText: { type: Type.STRING },
                  phoneticIPA: { type: Type.STRING },
                  pronunciationNotes: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  category: { type: Type.STRING },
                },
                required: ["originalText", "upgradedTextText", "explanation", "category"],
              },
            },
            matClarkTechniquesFeedback: {
              type: Type.OBJECT,
              properties: {
                leadInPhrasesUsed: { type: Type.BOOLEAN },
                pointingPhrasesUsed: { type: Type.BOOLEAN },
                situationalContrastUsed: { type: Type.BOOLEAN },
                secondConditionalsUsed: { type: Type.BOOLEAN },
                complexConnectivesUsed: { type: Type.BOOLEAN },
                notes: { type: Type.STRING },
              },
              required: ["leadInPhrasesUsed", "pointingPhrasesUsed", "situationalContrastUsed", "secondConditionalsUsed", "complexConnectivesUsed", "notes"],
            },
          },
          required: [
            "overallBand",
            "fluencyAndCoherence",
            "lexicalResource",
            "grammaticalRangeAndAccuracy",
            "pronunciation",
            "generalSummary",
            "keyPhrasalVerbsUsed",
            "recommendedPhrasalVerbs",
            "detailedUpgrades",
            "matClarkTechniquesFeedback",
          ],
        },
      },
    });

    const jsonText = response.text || "{}";
    const evalData = JSON.parse(jsonText);
    res.json(evalData);
  } catch (error: any) {
    console.error("IELTS Evaluation API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate evaluation" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`IELTS Speaking Master server running on http://localhost:${PORT}`);
  });
}

startServer();
