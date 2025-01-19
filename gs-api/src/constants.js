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

const QUESTIONS = [
    {
        id: 1,
        text: "Q1. I ______ experience bloating or gas.",
        displayText: "How often do you experience bloating or gas?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 2,
        text: "Q2. I ______ experience constipation or diarrhea.",
        displayText: "How often do you experience constipation or diarrhea?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 3,
        text: "Q3. I experience _______ symptoms regularly.",
        displayText: "Which symptoms do you experience regularly?",
        multiSelect: true,
        options: [
            "Acid reflux",
            "Nausea",
            "Diarrhea",
            "Bloating",
            "Fatigue after meals",
        ],
    },
    {
        id: 4,
        text: "Q4. I ______ experience discomfort or pain after eating.",
        displayText: "How often do you experience discomfort or pain after eating?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 5,
        text: "Q5. Eating spicy or fatty foods ______ worsens my symptoms.",
        displayText: "How do spicy or fatty foods affect your symptoms?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 6,
        text: "Q6. I avoid ______ due to intolerance or discomfort.",
        displayText: "Which foods do you avoid due to intolerance or discomfort?",
        multiSelect: true,
        options: ["Gluten", "Fried foods", "Dairy", "Spicy foods"],
    },
    {
        id: 7,
        text: "Q7. I ______ feel fatigue, especially after meals.",
        displayText: "How often do you feel fatigue, especially after meals?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 8,
        text: "Q8. I experience ______ inflammatory symptoms.",
        displayText: "Which inflammatory symptoms do you experience?",
        multiSelect: true,
        options: ["Abdominal pain", "Diarrhea", "Bloating"],
    },
    {
        id: 9,
        text: "Q9. I ______ experience flare-ups of gut symptoms (e.g., diarrhea, cramping).",
        displayText: "How often do you experience flare-ups of gut symptoms (e.g., diarrhea, cramping)?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 10,
        text: "Q10. I ______ experience changes in my gut symptoms when under stress.",
        displayText: "How often do you experience changes in your gut symptoms when under stress?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 11,
        text: "Q11. My symptoms ______ wake me up at night.",
        displayText: "How often do your symptoms wake you up at night?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 12,
        text: "Q12. I ______ experience worsened symptoms after consuming processed or fried foods.",
        displayText: "How often do you experience worsened symptoms after consuming processed or fried foods?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 13,
        text: "Q13. I experience ______ that may indicate gut microbiome imbalances.",
        displayText: "Which symptoms do you experience that may indicate gut microbiome imbalances?",
        multiSelect: true,
        options: [
            "Frequent bloating",
            "Sugar cravings",
            "Weight loss without diet changes",
        ],
    },
    {
        id: 14,
        text: "Q14. I ______ consume fermented foods like yogurt, kimchi, or sauerkraut.",
        displayText: "How often do you consume fermented foods like yogurt, kimchi, or sauerkraut?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 15,
        text: "Q15. I ______ take antibiotics.",
        displayText: "How often do you take antibiotics?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 16,
        text: "Q16. I ______ experience unexplained fatigue or low energy.",
        displayText: "How often do you experience unexplained fatigue or low energy?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 17,
        text: "Q17. I ______ experience sugar cravings.",
        displayText: "How often do you experience sugar cravings?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 18,
        text: "Q18. I ______ experience difficulty maintaining or losing weight despite a healthy lifestyle.",
        displayText: "How often do you experience difficulty maintaining or losing weight despite a healthy lifestyle?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 19,
        text: "Q19. I ______ notice changes in my digestion when I am anxious or stressed.",
        displayText: "How often do you notice changes in your digestion when you are anxious or stressed?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 20,
        text: "Q20. I ______ feel stressed in a typical week.",
        displayText: "How often do you feel stressed in a typical week?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 21,
        text: "Q21. I ______ experience changes (more or less) in eating patterns during periods of high stress.",
        displayText: "How often do you experience changes (more or less) in eating patterns during periods of high stress?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 22,
        text: "Q22. I ______ experience trouble falling or staying asleep.",
        displayText: "How often do you experience trouble falling or staying asleep?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 23,
        text: "Q23. I experience ______ during times of stress.",
        displayText: "Which symptoms do you experience during times of stress?",
        multiSelect: true,
        options: ["Nausea", "Abdominal pain", "Diarrhea"],
    },
    {
        id: 24,
        text: "Q24. I ______ engage in late-night eating or snacking.",
        displayText: "How often do you engage in late-night eating or snacking?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 25,
        text: "Q25. I experience ______ regularly.",
        displayText: "Which symptoms do you experience regularly?",
        multiSelect: true,
        options: [
            "Frequent muscle cramps",
            "Fatigue despite meals",
            "Frequent bloating",
        ],
    },
    {
        id: 26,
        text: "Q26. I ______ feel overly full or uncomfortable after eating.",
        displayText: "How often do you feel overly full or uncomfortable after eating?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 27,
        text: "Q27. I ______ experience fatigue despite eating balanced meals.",
        displayText: "How often do you experience fatigue despite eating balanced meals?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 28,
        text: "Q28. I ______ eat meals in a rush or while distracted.",
        displayText: "How often do you eat meals in a rush or while distracted?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 29,
        text: "Q29. I experience ______ regularly.",
        displayText: "Which symptoms do you experience regularly?",
        multiSelect: true,
        options: [
            "Weight loss without diet changes",
            "Frequent muscle cramps",
            "Bloating",
        ],
    },
    {
        id: 30,
        text: "Q30. I ______ feel hungry soon after eating meals.",
        displayText: "How often do you feel hungry soon after eating meals?",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
];

const system = `
Role: You are a medical analysis system trained in gastroenterology and digestive health assessment.
\n
Task: Analyze the provided symptom profile to:
- Identify primary symptom patterns
- Categorize into relevant condition types
- Assess severity and risk levels
- Provide evidence-based recommendations
\n
Constraints:
- Only use established medical criteria
- Indicate confidence levels clearly
- Flag any concerning symptoms
- Note when specialist evaluation is needed
\n
Format output as:
1. Primary Assessment
2. Confidence Level
3. Key Symptoms
4. Risk Classification
5. Recommended Actions (only the most immediate actions, not all reccomended ones)
\n
NOTE: If data is insufficient or uncertainty is high, indicate this transparently. All reasoning should be grounded in reliable medical information, avoiding speculation.
\n
CATEGORIZATION GUIDELINES:
Use the below categorizations and the relevant details to diagnose this patient. If they do not quite fit any of these categories with high confidence (>0.7) then state that they are relatively healthy. 
\n
Digestive Disorders
Relevant Questions: 1, 2, 3, 4, 5, 9, 26, 28
Primary Focus: Immediate GI symptoms and regular digestive function
Key Focus Areas:
Bloating and gas patterns (Q1)
Bowel movement irregularities (Q2)
Acid reflux/heartburn symptoms (Q3)
Post-meal discomfort timing (Q4, 26)
Food-related symptom triggers (Q5)
Symptom frequency patterns (Q9)
Eating pattern impacts (Q28)
Pattern Type: Regular digestive function disruption
\n
Inflammatory Conditions
Relevant Questions: 8, 11, 12, 13, 29
Primary Focus: Inflammatory response and chronic symptoms
Key Focus Areas:
Core inflammatory symptoms (Q8)
Night symptom patterns (Q11)
Food reaction severity (Q12)
Systemic inflammation signs (Q13)
Malabsorption indicators (Q29)
Pattern Type: Systemic inflammatory signs and chronic inflammation
\n
Gut Microbiome Imbalances
Relevant Questions: 13, 14, 15, 16, 17
Primary Focus: Microbial health and dysbiosis
Key Focus Areas:
Dysbiosis symptom patterns (Q13)
Fermented food consumption habits (Q14)
Antibiotic history impact (Q15)
Energy level fluctuations (Q16)
Sugar craving patterns (Q17)
Pattern Type: Long-term microbial disruption signs
\n
Gut-Brain Axis Issues
Relevant Questions: 10, 19, 20, 21, 22, 23, 24
Primary Focus: Stress-gut connection and psychological impacts
Key Focus Areas:
Stress-symptom correlations (Q10, 19)
Overall stress level impact (Q20)
Stress eating behaviors (Q21, 24)
Sleep pattern disruption (Q22)
Stress-related GI responses (Q23)
Pattern Type: Psychological-physical interaction patterns
\n
Nutrient Absorption Issues
Relevant Questions: 7, 25, 27, 28, 29, 30
Primary Focus: Nutrient utilization and metabolic function
Key Focus Areas:
Post-meal fatigue patterns (Q7)
Systemic nutrient deficiency signs (Q25)
Energy level consistency (Q27)
Eating pattern impacts (Q28)
Malabsorption indicators (Q29)
Satiety regulation issues (Q30)
Pattern Type: Absorption and metabolism disruption patterns
`

module.exports = { diagnosisSchema, QUESTIONS, system }