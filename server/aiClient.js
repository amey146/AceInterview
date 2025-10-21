import dotenv from "dotenv";
import { Groq } from "groq-sdk";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_KEY });


export async function getAIQuestion(selectedRole, level, quantity = 5) {
    const { mainRole, technologies } = selectedRole;

    // Question types for variety
    const questionTypes = ["coding", "theoretical", "situational"];
    const prompts = [];

    for (let i = 0; i < quantity; i++) {
        const type = questionTypes[i % questionTypes.length];
        const tech = technologies[Math.floor(Math.random() * technologies.length)];

        const prompt = (() => {
            switch (type) {
                case "coding":
                    return `Write a ${level}-level coding or logic question for a ${mainRole} using ${tech}.`;
                case "theoretical":
                    return `Write a ${level}-level conceptual or theoretical question for a ${mainRole} about ${tech}.`;
                case "situational":
                    return `Write a ${level}-level situational or practical scenario question for a ${mainRole} involving ${tech}, testing reasoning or approach.`;
            }
        })();

        prompts.push(`Q${i + 1}: ${prompt}`);
    }

    const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        temperature: 0.8,
        max_completion_tokens: 400,
        messages: [
            {
                role: "system",
                content:
                    "You are a professional interviewer. Generate varied, natural interview questions. Output only a JSON array of strings, no explanations.",
            },
            {
                role: "user",
                content: `Generate ${quantity} diverse interview questions (coding, theoretical, and situational) for a ${mainRole} (${level} level) based on these prompts:\n${prompts.join("\n")}\nReturn a valid JSON array like:\n["Question 1", "Question 2"]`,
            },
        ],
    });

    const responseText = chatCompletion.choices[0]?.message?.content?.trim() || "[]";
    let questions;
    try {
        questions = JSON.parse(responseText);
    } catch (err) {
        console.error("AI response parsing failed:", responseText);
        questions = [responseText];
    }

    return questions;
}





export async function getFinalReport(responses) {
    const text = responses
        .map((r, i) => `Q${i + 1}: ${r.question}\nA${i + 1}: ${r.answer}`)
        .join("\n\n");

    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `
You are an expert technical interviewer. Analyze the following Q&A session and respond ONLY in valid JSON format without extra text, markdown, or explanations.

Expected JSON structure:
{
  "overall_feedback": "Concise summary (1-2 lines) on tone, confidence, and communication clarity",
  "average_score": <number between 0 and 10>,
  "improvement_tips": [
    "Tip 1 (actionable improvement)",
    "Tip 2 (specific suggestion)",
    "Tip 3 (positive reinforcement or next step)"
  ]
}

Now analyze the candidate’s responses below and return the JSON only:

${text}
`
            }
        ],
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
        max_completion_tokens: 200,
        top_p: 1,
        stream: true
    });

    let fullResponse = "";
    for await (const chunk of chatCompletion) {
        fullResponse += chunk.choices[0]?.delta?.content || '';
    }

    try {
        // remove any trailing commas, fix quotes if needed
        const cleaned = fullResponse.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
        return JSON.parse(cleaned);
    } catch {
        return { error: "Invalid JSON format", raw: fullResponse };
    }

}

export async function isProfessionalEngineer(role) {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a professional assistant that only evaluates job roles."
            },
            {
                role: "user",
                content: `Is "${role}" a valid professional engineering designation? 
Reply only with "true" or "false".`
            }
        ],
        model: "llama-3.1-8b-instant",
        temperature: 0,
        max_completion_tokens: 5
    });
    let answer = "";
    // Handle streaming or non-streaming response
    if (Symbol.asyncIterator in Object(chatCompletion)) {
        // streaming
        for await (const chunk of chatCompletion) {
            answer += chunk.choices[0]?.delta?.content || '';
        }
    } else {
        // non-streaming
        answer = chatCompletion.choices[0]?.message?.content || '';
    }

    // Normalize the answer: lowercase, remove non-word characters
    const normalized = answer.trim().toLowerCase().replace(/[^\w]/g, "");

    return normalized === "true" || normalized === "yes";

}

const MAX_CHUNK_LENGTH = 3000;

export async function getAISummary(text) {
    if (!text) return { error: "No text provided" };

    // Split text into smaller chunks to avoid token limits
    const chunks = [];
    for (let i = 0; i < text.length; i += MAX_CHUNK_LENGTH) {
        chunks.push(text.slice(i, i + MAX_CHUNK_LENGTH));
    }

    let combinedSummary = {
        overall_summary: "",
        overall_score: 0,
        overall_level: "",
        top_strengths: [],
        improvement_tips: []
    };

    for (const chunk of chunks) {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `Provide a concise summary of the following text.
Respond ONLY in valid JSON matching exactly this structure:

{
  "overall_summary": "Concise summary (1-2 lines)",
  "overall_score": <number between 0 and 10>,
  "overall_level": "Junior/Mid/Senior Developer",
  "top_strengths": [abc,xyz,pqr],
  "improvement_tips": [
    "Tip 1 (actionable improvement)",
    "Tip 2 (specific suggestion)",
    "Tip 3 (positive reinforcement or next step)"
  ]
}

Text to summarize:
${chunk}`
                }
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.2, // lower for more consistent output
            max_completion_tokens: 300,
            top_p: 1,
            stream: true
        });

        let fullResponse = "";
        for await (const part of chatCompletion) {
            fullResponse += part.choices[0]?.delta?.content || "";
        }

        // Attempt to extract JSON object from response
        try {
            const jsonMatch = fullResponse.match(/\{[\s\S]*\}/); // extract {...}
            if (!jsonMatch) continue;

            const cleaned = jsonMatch[0]
                .replace(/,\s*}/g, "}") // remove trailing commas
                .replace(/,\s*]/g, "]") // remove trailing commas
                .replace(/'/g, '"'); // fix quotes

            const parsed = JSON.parse(cleaned);

            // Combine summaries incrementally
            combinedSummary.overall_summary +=
                (combinedSummary.overall_summary ? " " : "") + (parsed.overall_summary || "");
            combinedSummary.overall_score += parsed.overall_score || 0;
            combinedSummary.overall_level = parsed.overall_level || combinedSummary.overall_level;
            combinedSummary.top_strengths.push(...(parsed.top_strengths || []));
            combinedSummary.improvement_tips.push(...(parsed.improvement_tips || []));
        } catch (err) {
            console.warn("JSON parse failed for a chunk:", err, fullResponse);
        }
    }

    // Normalize score if multiple chunks
    if (chunks.length > 1) {
        combinedSummary.overall_score = combinedSummary.overall_score / chunks.length;
    }

    // Remove duplicate strengths or tips
    combinedSummary.top_strengths = [...new Set(combinedSummary.top_strengths)];
    combinedSummary.improvement_tips = [...new Set(combinedSummary.improvement_tips)];

    return combinedSummary;
}
