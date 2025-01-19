'use strict';

/**
 * new-gemini-type controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { diagnosisSchema } = require("../../../constants/gemini_schema");

module.exports = createCoreController('api::diagnosis.diagnosis', ({ strapi }) => ({
    async create(ctx) {
        const response = await super.create(ctx);
        const prompt = `I frequently experience bloating or gas, but I never experience constipation or diarrhea. I regularly experience symptoms like acid reflux, heartburn after meals, and occasional abdominal cramping. I occasionally feel discomfort or pain after eating, and eating spicy or fatty foods tends to worsen my symptoms (Agree). I avoid certain foods like lactose and fried foods due to intolerance or discomfort. I often feel fatigued, especially after meals (Agree), and experience symptoms such as abdominal pain and occasional blood in stool. I occasionally experience flare-ups of gut symptoms like cramping or diarrhea, and I notice significant variations in my gut symptoms when under stress (Agree). My symptoms occasionally wake me up at night, and they worsen after consuming processed or fried foods (Agree).

I regularly experience signs of gut microbiome imbalances, including frequent bloating, foul-smelling gas, and sugar cravings. I sometimes consume fermented foods like yogurt and kimchi, and I have taken antibiotics multiple times in the past year (Neutral). I often feel fatigued or low-energy without a clear reason (Agree) and frequently experience sugar cravings. Despite maintaining a healthy lifestyle, I find it difficult to lose or maintain weight (Agree). My digestion noticeably changes when I am anxious or stressed (Agree), and I frequently feel stressed during a typical week. During periods of high stress, I tend to eat more (Agree), and I occasionally experience trouble falling or staying asleep.

In times of stress, I experience symptoms like abdominal pain and nausea. I sometimes engage in emotional eating or snacking late at night (Neutral). Regular symptoms include bloating, fatigue after meals, and persistent hunger despite eating. I occasionally feel overly full or uncomfortable after eating and often feel tired or low-energy despite eating balanced meals (Agree). I frequently eat meals in a rush or while distracted. I have noticed nutrient absorption issues, such as muscle cramps, and feel like my meals don’t keep me full for long periods (Agree).`//response.data.user_prompt;

        if (!prompt) {
            return ctx.badRequest("Prompt is required");
        }


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
