import { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions";

export default function Question({ onSelectAnswer, onSkipAnswer, index }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: "",
        isCorrect: null,
    });
    const currentQuestion = QUESTIONS[index];
    let timeout = 10000;
    if (answer.selectedAnswer) {
        timeout = 1000;
    }
    if (answer.isCorrect !== null) {
        timeout = 2000;
    }
    const handleSelectAnswer = (answer) => {
        setAnswer({ selectedAnswer: answer, isCorrect: null });
        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: currentQuestion.answers[0] === answer,
            });
            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    };
    let answerState = "";
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? "correct" : "wrong";
    } else if (answer.selectedAnswer) {
        answerState = "answered";
    }
    return (
        <div id="question">
            <QuestionTimer
                key={timeout}
                timeout={timeout}
                onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
                mode={answerState}
            />
            <h2>{currentQuestion.text}</h2>
            <Answers
                answers={currentQuestion.answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            ></Answers>
        </div>
    );
}
