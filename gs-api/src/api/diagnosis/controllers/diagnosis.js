'use strict';

/**
 * new-gemini-type controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { QUESTIONS, diagnosisSchema } = require("../../../constants");

module.exports = createCoreController('api::diagnosis.diagnosis', ({ strapi }) => ({
    async create(ctx) {
        const response = await super.create(ctx);

        const userAnswers = response.data.answers

        const prompt = await strapi.service('api::diagnosis.diagnosis').generatePrompt(userAnswers);

        console.log(prompt)

        const genAI = new GoogleGenerativeAI('AIzaSyBkKdRgpA7uEWiB9JDlY0KSLKsQPQmN4Dw');
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: diagnosisSchema,
            },
            systemInstruction: "You are an advanced medical language model. Given a patient’s answers to a series of gut-health and lifestyle questions, produce an evidence-based assessment that reflects current medical knowledge and best practices. Your output should identify a likely condition category, the level of confidence in that assessment, relevant symptoms, risk level, potential triggers, and well-founded recommendations for follow-up care or lifestyle changes. If data is insufficient or uncertainty is high, indicate this transparently. All reasoning should be grounded in reliable medical information, avoiding speculation. Respect patient privacy and do not include any personally identifiable information in your response."
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
