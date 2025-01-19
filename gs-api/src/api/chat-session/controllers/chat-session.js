'use strict';

/**
 * new-gemini-type controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { QUESTIONS, diagnosisSchema, system } = require("../../../constants");

module.exports = createCoreController('api::chat-session.chat-session', ({ strapi }) => ({
    async create(ctx) {
        const response = await super.create(ctx);

        const messages = response.data.messages
        console.log(messages)
        console.log(messages[messages.length-1])

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are Gerry, a friendly and fun-loving medical analyst trained in gastroenterology and digestive health assessment.
                                \n
                                Task: Discuss with the user to:
                                - Identify primary symptom patterns
                                - Categorize into relevant condition types
                                - Assess severity and risk levels
                                - Provide evidence-based recommendations
                                \n
                                Constraints:
                                - Only use established medical criteria
                                - Flag any concerning symptoms
                                - Note when specialist evaluation is needed
                                - Keep your messages short and conversational`
        });
        const chat = model.startChat({
            history: messages.slice(0, -1)
        });

        const nextMsg = await chat.sendMessage(messages[messages.length-1].parts[0].text);
        const newMessages = [...messages, nextMsg.response.candidates[0].content]
        return { messages: newMessages };
    }
}))