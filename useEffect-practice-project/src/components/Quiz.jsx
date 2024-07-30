import QUESTIONS from "../questions";
import quizCompletedImage from "../assets/quiz-complete.png";
import { useState, useCallback } from "react";
import Question from "./Question";
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const currentQuestionIndex = userAnswers.length;
    const quizCompleted = userAnswers.length === QUESTIONS.length;

    const handleSetUserAnswer = useCallback(function handleSetUserAnswer(
        selectedAnswer
    ) {
        setUserAnswers((prev) => {
            return [...prev, selectedAnswer];
        });
    },
    []);

    const handleSkipAnswer = useCallback(
        () => handleSetUserAnswer(null),
        [handleSetUserAnswer]
    );

    if (quizCompleted) {
        return (
            <div id="summary">
                <img src={quizCompletedImage} alt="" />
                <h2>Quiz Completed</h2>
            </div>
        );
    }

    return (
        <div id="quiz">
            <Question
                key={currentQuestionIndex}
                index={currentQuestionIndex}
                onSelectAnswer={handleSetUserAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}
