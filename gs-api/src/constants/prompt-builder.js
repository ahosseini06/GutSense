const {QUESTIONS} = require("./questions");

const generatePrompt = (answers) => {
    // Each statement uses "______" as the placeholder
    const questions = QUESTIONS.map((question) => question.text);

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