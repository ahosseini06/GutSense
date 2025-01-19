'use strict';

/**
 * new-gemini-type controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { QUESTIONS, diagnosisSchema, system } = require("../../../constants");

module.exports = createCoreController('api::diagnosis.diagnosis', ({ strapi }) => ({
    async create(ctx) {
        const response = await super.create(ctx);

        const userAnswers = response.data.answers

        const prompt = await strapi.service('api::diagnosis.diagnosis').generatePrompt(userAnswers);

        console.log(prompt)

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: diagnosisSchema,
            },
            systemInstruction: system
        });

        const result = await model.generateContent(prompt);
        const completion = result.response.candidates[0].content.parts[0].text
        const completionJSON = JSON.parse(completion);
        return completionJSON
    },

    async getQuestions(ctx) {
        return QUESTIONS;
    }
}))
