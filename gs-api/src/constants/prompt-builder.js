const generatePrompt = (answers) => {
    // Each statement uses "______" as the placeholder
    const questions = [
        "I ______ experience bloating or gas.",
        "I ______ experience constipation or diarrhea.",
        "I experience ______ symptoms regularly.",
        "I ______ experience discomfort or pain after eating.",
        "Eating spicy or fatty foods ______ worsens my symptoms.",
        "I avoid ______ due to intolerance or discomfort.",
        "I ______ feel fatigue, especially after meals.",
        "I experience ______ inflammatory symptoms.",
        "I ______ experience flare-ups of gut symptoms (e.g., diarrhea, cramping).",
        "I ______ experience changes in my gut symptoms when under stress.",
        "My symptoms ______ wake me up at night.",
        "I ______ experience worsened symptoms after consuming processed or fried foods.",
        "I experience ______ that may indicate gut microbiome imbalances.",
        "I ______ consume fermented foods like yogurt, kimchi, or sauerkraut.",
        "I ______ take antibiotics.",
        "I ______ experience unexplained fatigue or low energy.",
        "I ______ experience sugar cravings.",
        "I ______ experience difficulty maintaining or losing weight despite a healthy lifestyle.",
        "I ______ notice changes in my digestion when I am anxious or stressed.",
        "I ______ feel stressed in a typical week.",
        "I ______ experience changes (more or less) in eating patterns during periods of high stress.",
        "I ______ experience trouble falling or staying asleep.",
        "I experience ______ during times of stress.",
        "I ______ engage in late-night eating or snacking.",
        "I experience ______ regularly.",
        "I ______ feel overly full or uncomfortable after eating.",
        "I ______ experience fatigue despite eating balanced meals.",
        "I ______ eat meals in a rush or while distracted.",
        "I experience _______ regularly.",
        "I ______ feel hungry soon after eating meals."
    ];

    // Build the paragraph by replacing the placeholders with user input
    const filledStatements = questions.map((question, index) => {
        let response = answers.filter((answer) => answer.questionId === index+1)[0].answer;

        // If the response is an array (multi-select), join with commas
        if (Array.isArray(response)) {
            response = response.join(", ");
        }

        return question.replace("______", response);
    });

    // Join all statements into a single paragraph
    return filledStatements.join(" ");
};

module.exports = {generatePrompt}