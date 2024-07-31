import QUESTIONS from "../questions";
import quizCompletedImage from "../assets/quiz-complete.png";
import { useState, useCallback } from "react";
import Question from "./Question";
import Summary from "./Summary";
export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const currentQuestionIndex = userAnswers.length;
    const quizCompleted = userAnswers.length === QUESTIONS.length;

    // const handleSetUserAnswer = useCallback(function handleSetUserAnswer(
    //     selectedAnswer
    // ) {
    //     setUserAnswers((prev) => {
    //         return [...prev, selectedAnswer];
    //     });
    // },
    // []);

    function handleSetUserAnswer(selectedAnswer) {
        setUserAnswers((prev) => {
            return [...prev, selectedAnswer];
        });
    }

    const handleSkipAnswer = useCallback(
        () => handleSetUserAnswer(null),
        [handleSetUserAnswer]
    );

    if (quizCompleted) {
        return <Summary userAnswers={userAnswers} />;
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
