// DiagnosisForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddEntityMutation } from "../services/gutsense";
import Question from "../components/question/Question";
import styles from "./styles/Form.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

// These are the actual questions provided.
const QUESTIONS = [
    {
        id: 1,
        text: "I ______ experience bloating or gas.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 2,
        text: "I ______ experience constipation or diarrhea.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 3,
        text: "I experience _______ symptoms regularly.",
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
        text: "I ______ experience discomfort or pain after eating.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 5,
        text: "Eating spicy or fatty foods ______ worsens my symptoms.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 6,
        text: "I avoid ______ due to intolerance or discomfort.",
        multiSelect: true,
        options: ["Gluten", "Fried foods", "Dairy", "Spicy foods"],
    },
    {
        id: 7,
        text: "I _______ feel fatigue, especially after meals.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 8,
        text: "I experience _______ inflammatory symptoms.",
        multiSelect: true,
        options: ["Abdominal pain", "Diarrhea", "Bloating"],
    },
    {
        id: 9,
        text: "I _______ experience flare-ups of gut symptoms (e.g., diarrhea, cramping).",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 10,
        text: "I ______ experience changes in my gut symptoms when under stress.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 11,
        text: "My symptoms ______ wake me up at night.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 12,
        text: "I ______ experience worsened symptoms after consuming processed or fried foods.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 13,
        text: "I experience _______ that may indicate gut microbiome imbalances.",
        multiSelect: true,
        options: [
            "Frequent bloating",
            "Sugar cravings",
            "Weight loss without diet changes",
        ],
    },
    {
        id: 14,
        text: "I ______ consume fermented foods like yogurt, kimchi, or sauerkraut.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 15,
        text: "I ______ take antibiotics.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 16,
        text: "I ______ experience unexplained fatigue or low energy.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 17,
        text: "I ______ experience sugar cravings.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 18,
        text: "I ______ experience difficulty maintaining or losing weight despite a healthy lifestyle.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 19,
        text: "I ______ notice changes in my digestion when I am anxious or stressed.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 20,
        text: "I ______ feel stressed in a typical week.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 21,
        text: "I ______ experience changes (more or less) in eating patterns during periods of high stress.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 22,
        text: "I ______ experience trouble falling or staying asleep.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 23,
        text: "I experience _______ during times of stress.",
        multiSelect: true,
        options: ["Nausea", "Abdominal pain", "Diarrhea"],
    },
    {
        id: 24,
        text: "I ______ engage in late-night eating or snacking.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 25,
        text: "I experience _______ regularly.",
        multiSelect: true,
        options: [
            "Frequent muscle cramps",
            "Fatigue despite meals",
            "Frequent bloating",
        ],
    },
    {
        id: 26,
        text: "I ______ feel overly full or uncomfortable after eating.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 27,
        text: "I ______ experience fatigue despite eating balanced meals.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 28,
        text: "I ______ eat meals in a rush or while distracted.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
    {
        id: 29,
        text: "I experience _______ regularly.",
        multiSelect: true,
        options: [
            "Weight loss without diet changes",
            "Frequent muscle cramps",
            "Bloating",
        ],
    },
    {
        id: 30,
        text: "I ______ feel hungry soon after eating meals.",
        multiSelect: false,
        options: ["Never", "Occasionally", "Frequently", "Always"],
    },
];

function DiagnosisForm() {
    const navigate = useNavigate();
    const [addEntity] = useAddEntityMutation();

    // We'll keep an array of answers, each item can be either a string or an array of strings (for multi-select).
    // answer is : {questionId: int
    //             answer: string or array of strings}
    const [answers, setAnswers] = useState(
        QUESTIONS.map((question) => ({
            questionId: question.id,
            answer: question.multiSelect ? [] : null,
        }))
    );

    const [currentQuestion, setCurrentQuestion] = useState(1);

    const getAnswers = () => answers;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Post data to your endpoint

            const response = await addEntity({
                name: "diagnoses",
                body: {
                    data: {
                        answers: answers.filter((answer) => answer.answer),
                    }
                },
            })

            const data = response;
            // Navigate to the diagnosis page with the response in state
            localStorage.setItem("diagnosis", JSON.stringify(data));
            navigate("/diagnosis", { state: data });
        } catch (error) {
            console.error("Error fetching diagnosis:", error);
            // In a real app, show an error message to the user
        }
    };

    //remove later
    useEffect(() => {
        console.log(answers);
    }, [answers]);

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Does your gut need a hand?</h1>

            {/*QUESTIONS.map((question) => (
        <Question
          setGlobalResponse={setAnswers}
          question={question}
          getAnswers={answers}
        ></Question>
      ))*/}
            <div className={styles.body}>
                <div className={styles.questionContainer}>
                    <div
                        className={styles.navigateLeft}
                        onClick={
                            currentQuestion > 1
                                ? () => setCurrentQuestion(currentQuestion - 1)
                                : null
                        }
                    >
                        {currentQuestion > 1 && (
                            <IoIosArrowBack
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        )}
                    </div>

                    <Question
                        setGlobalResponse={setAnswers}
                        question={QUESTIONS[currentQuestion - 1]}
                        setCurrentQuestion={setCurrentQuestion}
                        getAnswers={answers}
                    ></Question>
                    <div className={styles.navigateRight}>
                        {answers[currentQuestion - 1].answer && (
                            <IoIosArrowForward
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                                onClick={
                                    currentQuestion < QUESTIONS.length
                                        ? () => setCurrentQuestion(currentQuestion + 1)
                                        : handleSubmit
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiagnosisForm;
