'use strict';

/**
 * new-gemini-type controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { chatInstructions } = require("../../../constants");

module.exports = createCoreController('api::chat-session.chat-session', ({ strapi }) => ({
    async create(ctx) {
        const response = await super.create(ctx);

        const messages = response.data.messages
        const diagnosis = response.data.diagnosis

        if(messages.length === 0) {
            return { messages: [
                {
                    parts: [{text: "Hello, I'm Gerry, your virtual health assistant. I'm here to help you with any health-related questions you may have. How can I help you today?"}],
                    role: "model"
                }
            ] };
        }

        let sanitizedMessages;

        if(messages[0].role === "model") {
            sanitizedMessages = messages.slice(1);
            if(sanitizedMessages.length === 0) {
                return ctx.badRequest("No user message found");
            }
        } else {
            sanitizedMessages = messages;
        }
        sanitizedMessages.pop()

        const system = chatInstructions + (diagnosis ? '\nThe user has already received the following diagnosis:\n' + JSON.stringify(diagnosis) : '');

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: system
        });
        const chat = model.startChat({
            history: sanitizedMessages
        });

        const nextMsg = await chat.sendMessage(messages[0] ? messages[messages.length-1].parts[0].text : []);
        const newMessages = [...messages, nextMsg.response.candidates[0].content]
        return { messages: newMessages };
    }
}))