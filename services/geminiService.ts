
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIFeedSummary = async (newsItems: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize these UKBU news items into a single, punchy "Update for the Squad" (max 60 words): ${newsItems.join(', ')}`,
      config: { temperature: 0.7 },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Stay tuned for more updates from the terrace!";
  }
};

export const getAINewsAnalysis = async (title: string, content: string, language: 'English' | 'Bengali' = 'English') => {
  try {
    const prompt = `
      Analyze the following sports news article:
      Title: ${title}
      Content: ${content}
      
      Tasks:
      1. Provide a 3-bullet point summary in ${language}.
      2. If the text is English, translate the summary to Bengali as well.
      3. Keep the tone excited and supportive.
    `;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { temperature: 0.5 },
    });
    return response.text;
  } catch (error) {
    return "Analysis unavailable right now. Football is unpredictable!";
  }
};

export const moderateContent = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following user post for toxic language, hate speech, or harassment. If it is safe, respond with "SAFE". If it is harmful, respond with "FLAGGED" followed by a brief reason. Text: "${text}"`,
      config: { temperature: 0.1 },
    });
    return response.text?.includes("SAFE") ? "SAFE" : "FLAGGED";
  } catch (error) {
    return "SAFE"; // Fallback to safe if API fails
  }
};

export const getAISocialSummary = async (posts: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize these social media updates for the UKBU community wall (max 50 words + emojis): ${posts.join(' | ')}`,
      config: { temperature: 0.8 },
    });
    return response.text;
  } catch (error) {
    return "The squad is busy making waves! Check out the direct links below.";
  }
};

export const generateTriviaQuestion = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate a challenging football trivia question for a die-hard UKBU member. Focus on Bangladesh football history, key players, or iconic global football moments. Provide 4 unique options and the index of the correct one.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            correctIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctIndex", "explanation"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Trivia Error:", error);
    return null;
  }
};

export const getGameFeedback = async (correct: boolean, score: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The player just answered a trivia question ${correct ? 'correctly' : 'incorrectly'}. Their total score is ${score}. Give them a brief, funny, and punchy comment in the style of an Ultras leader (max 15 words).`,
      config: { temperature: 0.9 },
    });
    return response.text;
  } catch (error) {
    return correct ? "Top bins! Keep going." : "Absolute disaster class. Focus!";
  }
};

export const startUKBUChat = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are the Official UKBU AI Assistant. UKBU (United Kingdom Bangladesh Ultras) is a supporters group for the Bangladesh national football team. 
        Your goals:
        1. Answer questions about UKBU history (founded 2018, recognized 2020).
        2. Help with membership (Digital ID cards, Hub features).
        3. Discuss merchandise (Jersey £45, Scarf £15 - available in 'The Vault' shop tab).
        4. Promote community events.
        5. Use a "terrace" tone: passionate, supportive, slightly edgy but respectful, uses football metaphors. 
        6. Keep answers punchy and suitable for a mobile app chat.`,
      }
    });
    
    // We don't have a direct 'sendMessage' that takes history in this SDK easily without keeping the instance, 
    // so we'll simulate it by including the history in the prompt if needed, or use generateContent for stateless calls.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: { 
        systemInstruction: `You are the Official UKBU AI Assistant. UKBU (United Kingdom Bangladesh Ultras) is a supporters group for the Bangladesh national football team. 
        Your goals:
        1. Answer questions about UKBU history (founded 2018, recognized 2020).
        2. Help with membership (Digital ID cards, Hub features).
        3. Discuss merchandise (Jersey £45, Scarf £15 - available in 'The Vault' shop tab).
        4. Promote community events.
        5. Use a "terrace" tone: passionate, supportive, slightly edgy but respectful, uses football metaphors. 
        6. Keep answers punchy and suitable for a mobile app chat.`
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return "The signal from the terrace is weak! Try again in a minute.";
  }
};
