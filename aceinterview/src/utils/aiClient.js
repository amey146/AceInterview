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
export async function getAIResponse(currentQuestion, userAnswer) {

}



