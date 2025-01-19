'use strict';

/**
 * new-gemini-type controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::diagnosis.diagnosis', ({ strapi }) => ({
    async create(ctx) {
        const response = await super.create(ctx);
        const prompt = response.data.user_prompt;

        if(!prompt) {
            return ctx.badRequest("Prompt is required");
        }

        const { GoogleGenerativeAI } = require("@google/generative-ai");

        const genAI = new GoogleGenerativeAI('AIzaSyBkKdRgpA7uEWiB9JDlY0KSLKsQPQmN4Dw');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const completion = result.response.candidates[0].content.parts[0]
        
        return completion
    }
}))
