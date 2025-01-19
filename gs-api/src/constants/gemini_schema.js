const { SchemaType } = require("@google/generative-ai");

const diagnosisSchema = {
    type: SchemaType.OBJECT,
    description: "Output schema for medical diagnosis details",
    properties: {
        symptoms: {
            type: SchemaType.ARRAY,
            description: "List of symptoms experienced",
            items: {
                type: SchemaType.STRING,
            },
            nullable: false,
        },
        triggers: {
            type: SchemaType.ARRAY,
            description: "List of triggers that may exacerbate symptoms",
            items: {
                type: SchemaType.STRING,
            },
            nullable: false,
        },
        risk_level: {
            type: SchemaType.STRING,
            description: "Overall risk level (e.g. Low, Moderate, High)",
            nullable: false,
        },
        condition_category: {
            type: SchemaType.STRING,
            description: "Broad category/classification of the condition (e.g. 'Inflammatory Conditions')",
            nullable: false,
        },
        confidence: {
            type: SchemaType.NUMBER,
            description: "Confidence level for this diagnosis (0.0 - 1.0)",
            nullable: false,
        },
        recommendations: {
            type: SchemaType.ARRAY,
            description: "Recommended actions or lifestyle changes",
            items: {
                type: SchemaType.STRING,
            },
            nullable: false,
        },
        follow_up: {
            type: SchemaType.ARRAY,
            description: "Suggested follow-up actions or consultations",
            items: {
                type: SchemaType.STRING,
            },
            nullable: false,
        },
    },
    required: [
        "symptoms",
        "triggers",
        "risk_level",
        "condition_category",
        "confidence",
        "recommendations",
        "follow_up",
    ],
};

module.exports = {diagnosisSchema}