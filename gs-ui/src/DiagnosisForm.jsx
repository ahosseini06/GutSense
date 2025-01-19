// DiagnosisForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// These are the actual questions provided.
const QUESTIONS = [
    "I ______ experience bloating or gas.",
    "I ______ experience constipation or diarrhea.",
    "I experience _______ symptoms regularly.",
    "I ______ experience discomfort or pain after eating.",
    "Eating spicy or fatty foods ______ worsens my symptoms.",
    "I avoid ______ due to intolerance or discomfort.",          // Possibly multi-select
    "I _______ feel fatigue, especially after meals.",
    "I experience _______ inflammatory symptoms.",              // Possibly multi-select
    "I _______ experience flare-ups of gut symptoms (e.g., diarrhea, cramping).",
    "I ______ experience changes in my gut symptoms when under stress.",
    "My symptoms ______ wake me up at night.",
    "I ______ experience worsened symptoms after consuming processed or fried foods.",
    "I experience _______ that may indicate gut microbiome imbalances.", // Possibly multi-select
    "I ______ consume fermented foods like yogurt, kimchi, or sauerkraut.",
    "I ______ take antibiotics.",
    "I ______ experience unexplained fatigue or low energy.",
    "I ______ experience sugar cravings.",
    "I ______ experience difficulty maintaining or losing weight despite a healthy lifestyle.",
    "I ______ notice changes in my digestion when I am anxious or stressed.",
    "I ______ feel stressed in a typical week.",
    "I ______ experience changes (more or less) in eating patterns during periods of high stress.",
    "I ______ experience trouble falling or staying asleep.",
    "I experience _______ during times of stress.",             // Possibly multi-select
    "I ______ engage in late-night eating or snacking.",
    "I experience _______ regularly.",                          // Possibly multi-select
    "I ______ feel overly full or uncomfortable after eating.",
    "I ______ experience fatigue despite eating balanced meals.",
    "I ______ eat meals in a rush or while distracted.",
    "I experience _______ regularly.",                          // Possibly multi-select
    "I ______ feel hungry soon after eating meals."
];

const simpleOptions = ["Never", "Occasionally", "Frequently", "Always"];

// You might want to handle multi-select for certain questions.
// For simplicity, let's assume only one or two are multi-select to demonstrate.
const multiSelectIndices = [5, 7, 12, 23, 24, 29];
// Indices where the user can choose multiple items from a small set, e.g. "Gluten", "Fried foods" etc.
const multiSelectChoices = [
    "Acid reflux",
    "Nausea",
    "Gluten",
    "Fried foods",
    "Abdominal pain",
    "Diarrhea",
    "Bloating",
    "Fatigue after meals",
    "Frequent bloating",
    "Sugar cravings",
    "Weight loss without diet changes",
    "Frequent muscle cramps",
];

function DiagnosisForm() {
    const navigate = useNavigate();

    // We'll keep an array of answers, each item can be either a string or an array of strings (for multi-select).
    const [answers, setAnswers] = useState(
        Array(QUESTIONS.length).fill("Never") // default to "Never" for single-select
    );

    const handleSimpleSelectChange = (index, value) => {
        const updated = [...answers];
        updated[index] = value;
        setAnswers(updated);
    };

    const handleMultiSelectChange = (index, choice) => {
        // If currently a string, convert to array, or if it's an array, toggle the choice
        const currentValue = answers[index];
        let newValue = [];

        if (Array.isArray(currentValue)) {
            // Toggle the choice
            if (currentValue.includes(choice)) {
                newValue = currentValue.filter((c) => c !== choice);
            } else {
                newValue = [...currentValue, choice];
            }
        } else {
            // If first time, create a new array with choice
            newValue = [choice];
        }

        const updated = [...answers];
        updated[index] = newValue;
        setAnswers(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Post data to your endpoint
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/diagnoses`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        data: {
                            answers,
                        },
                    }),
                }
            );

            const data = await response.json();
            // Navigate to the diagnosis page with the response in state
            navigate("/diagnosis", { state: data });
        } catch (error) {
            console.error("Error fetching diagnosis:", error);
            // In a real app, show an error message to the user
        }
    };

    return (
        <div className="form-container">
            <h1>Gut Health Questionnaire</h1>
            <form onSubmit={handleSubmit}>
                {QUESTIONS.map((question, index) => {
                    const isMultiSelect = multiSelectIndices.includes(index);

                    return (
                        <div className="form-group" key={index}>
                            <label>{question}</label>
                            {isMultiSelect ? (
                                <div className="multi-select-container">
                                    {multiSelectChoices.map((choice) => (
                                        <label key={choice} className="multi-select-option">
                                            <input
                                                type="checkbox"
                                                value={choice}
                                                onChange={() =>
                                                    handleMultiSelectChange(index, choice)
                                                }
                                                checked={
                                                    Array.isArray(answers[index]) &&
                                                    answers[index].includes(choice)
                                                }
                                            />
                                            {choice}
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <select
                                    value={answers[index]}
                                    onChange={(e) =>
                                        handleSimpleSelectChange(index, e.target.value)
                                    }
                                >
                                    {simpleOptions.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    );
                })}

                <button type="submit" className="submit-button">
                    Get Diagnosis
                </button>
            </form>
        </div>
    );
}

export default DiagnosisForm;
