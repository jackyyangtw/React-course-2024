import quizCompletedImage from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";
export default function Summary({ userAnswers }) {
    const skippedAnswers = userAnswers.filter((answer) => answer === null);
    const correctAnswers = userAnswers.filter(
        (answer, index) => answer === QUESTIONS[index].answers[0]
    );
    const skippedAnswersPercent = Math.round(
        (skippedAnswers.length / userAnswers.length) * 100
    );
    const correctAnswersPercent = Math.round(
        (correctAnswers.length / userAnswers.length) * 100
    );
    const wrongAnswersPercent =
        100 - skippedAnswersPercent - correctAnswersPercent;
    return (
        <div id="summary">
            <img src={quizCompletedImage} alt="" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedAnswersPercent}%</span>
                    <span className="text">Skipped</span>
                </p>
                <p>
                    <span className="number">{correctAnswersPercent}%</span>
                    <span className="text">Correct</span>
                </p>
                <p>
                    <span className="number">{wrongAnswersPercent}%</span>
                    <span className="text">Wrong</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((userAnswer, index) => {
                    const question = QUESTIONS[index];
                    let cssClass = "user-answer";
                    if (userAnswer === null) {
                        cssClass += " skipped";
                    } else if (userAnswer === question.answers[0]) {
                        cssClass += " correct";
                    } else {
                        cssClass += " wrong";
                    }
                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className="question">{question.text}</p>
                            <p className={cssClass}>
                                {userAnswer ?? "Skipped"}
                            </p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
