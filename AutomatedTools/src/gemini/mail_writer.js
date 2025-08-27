import { GoogleGenAI } from "@google/genai";
import {system_prompt} from "./system_prompt_for_mail.js";
import "dotenv/config"

export default async function main(userPrompt) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    responseMimeType: "text/plain",
    systemInstruction: [
      system_prompt
    ],
  };
  const model = "gemini-2.5-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: userPrompt,
        },
      ],
    }
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
  return response.text;
}

