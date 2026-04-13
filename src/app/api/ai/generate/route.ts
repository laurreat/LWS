import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, config } = await request.json();

    // DeepSeek API - Gratis y barato
    const deepseekKey = process.env.DEEPSEEK_API_KEY || "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";
    const deepseekEndpoint = "https://api.deepseek.com/v1/chat/completions";

    // Try DeepSeek first
    const deepseekResponse = await fetch(deepseekEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${deepseekKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `You are an English teacher helper. Generate educational questions for English language learners.
            
Create questions in JSON format with this exact structure:
{"questions": [{"question": "string", "correct_answer": "string", "options": ["string", "string", "string", "string"], "points": number}]}

Important: Always respond with valid JSON only, no additional text or explanations.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (deepseekResponse.ok) {
      const data = await deepseekResponse.json();
      const content = JSON.parse(data.choices[0].message.content);

      return NextResponse.json({
        game: {
          id: crypto.randomUUID(),
          title: `${config.topic} - ${config.level}`,
          topic: config.topic,
          level: config.level,
          game_type: config.gameType,
          content,
          provider: "deepseek",
        },
      });
    }

    // Fallback: generate mock data
    throw new Error("API failed");
  } catch (error) {
    console.error("Error:", error);
    // Return mock data as fallback
    return NextResponse.json({
      game: generateMockGame(config),
      provider: "fallback",
    });
  }
}

function generateMockGame(config: any) {
  const sampleWords: Record<string, string> = {
    book: "libro",
    house: "casa", 
    car: "carro",
    water: "agua",
    food: "comida",
    friend: "amigo",
    family: "familia",
    work: "trabajo",
    school: "escuela",
    time: "tiempo",
    red: "rojo",
    blue: "azul",
    green: "verde",
    yellow: "amarillo",
    cat: "gato",
    dog: "perro",
    bird: "pájaro",
    fish: "pez",
    sun: "sol",
    moon: "luna",
  };

  const words = Object.keys(sampleWords);
  const questions = [];

  for (let i = 0; i < config.numQuestions; i++) {
    const word = words[i % words.length];
    const translation = sampleWords[word];
    const otherWords = words.filter((w) => w !== word).sort(() => Math.random() - 0.5);

    const optionCount = 4;
    const options = [translation, ...otherWords.slice(0, optionCount - 1)].sort(
      () => Math.random() - 0.5
    );

    questions.push({
      question: `What is the English word for "${translation}"?`,
      correct_answer: word,
      options,
      points: config.difficulty === "easy" ? 10 : config.difficulty === "medium" ? 15 : 20,
    });
  }

  return {
    id: crypto.randomUUID(),
    title: `${config.topic} - ${config.level}`,
    topic: config.topic,
    level: config.level,
    game_type: config.gameType,
    content: { questions },
  };
}