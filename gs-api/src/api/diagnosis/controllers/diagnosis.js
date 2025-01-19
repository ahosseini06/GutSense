'use strict';

/**
 * new-gemini-type controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { diagnosisSchema } = require("../../../constants/gemini_schema");
const { generatePrompt } = require("../../../constants/prompt-builder");

module.exports = createCoreController('api::diagnosis.diagnosis', ({ strapi }) => ({
    async create(ctx) {
        const response = await super.create(ctx);

        const userAnswers = response.data.answers

        const prompt = generatePrompt(userAnswers);

        console.log(prompt)

        const genAI = new GoogleGenerativeAI('AIzaSyBkKdRgpA7uEWiB9JDlY0KSLKsQPQmN4Dw');
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: diagnosisSchema,
            }
        });

        const result = await model.generateContent(prompt);
        const completion = result.response.candidates[0].content.parts[0].text
        const completionJSON = JSON.parse(completion);
        return completionJSON
    }
}))
