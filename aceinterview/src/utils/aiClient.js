// import { Groq } from 'groq-sdk';
// API Key goes here, make sure I don't expose it in public repos
// const groq = new Groq();

export async function getAIQuestion(role, level) {
    // const chatCompletion = await groq.chat.completions.create({
    //     "messages": [
    //         {
    //             "role": "system",
    //             "content": "You are a professional interviewer"
    //         },
    //         {
    //             "role": "user",
    //             "content": `Generate one realistic interview question for a ${role} with ${level} experience`
    //         }
    //     ],
    //     "model": "llama-3.1-8b-instant",
    //     "temperature": 1,
    //     "max_completion_tokens": 1024,
    //     "top_p": 1,
    //     "stream": true,
    //     "stop": null
    // });
    // return chatCompletion;
    return "Apka phela sawal apki screen par ye raha " + role + " " + level;
}
export async function getAIResponse(currentQuestion, userAnswer) {

}



