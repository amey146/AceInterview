import { Groq } from 'groq-sdk';
import { GROQ_KEY } from '../secrets/keys';
// API Key goes here, make sure I don't expose it in public repos
const groq = new Groq({ apiKey: GROQ_KEY, dangerouslyAllowBrowser: true });

export async function getAIQuestion(role, level) {
    const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
                "role": "system",
                "content": "You are a professional interviewer. Only output the question text, no explanations or extra details."
            },
            {
                "role": "user",
                "content": `Generate a single short and concise interview question for a ${role} with ${level} experience. 
Only return the question itself. 
Do not include explanations, evaluation criteria, or notes.`
            }
        ],
        "model": "llama-3.1-8b-instant",
        "temperature": 0.7,
        "max_completion_tokens": 50,
        "top_p": 1,
        "stream": true,
        "stop": null
    });
    let fullQuestion = "";
    for await (const chunk of chatCompletion) {
        fullQuestion += (chunk.choices[0]?.delta?.content || '');
    }
    return fullQuestion;
}
export async function getFinalReport(responses) {
    const text = responses
        .map((r, i) => `Q${i + 1}: ${r.question}\nA${i + 1}: ${r.answer}`)
        .join("\n\n");

    const prompt = `
You are an expert interviewer. Analyze the following Q&A session and give a JSON report:
{
  "overall_feedback": "summary of tone and clarity",
  "average_score": 0-10,
  "improvement_tips": ["tip1", "tip2", "tip3"]
}
Q&A:
${text}
  `;

    const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
    });

    return JSON.parse(res.choices[0].message.content);
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



