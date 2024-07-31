import { useEffect, useState } from "react";
const progressBarSpeed = 10;
export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log("timeout changed");
        const timer = setTimeout(onTimeout, timeout);
        return () => clearTimeout(timer);
    }, [timeout, onTimeout]);

    useEffect(() => {
        console.log("remainingTime changed");
        const interval = setInterval(() => {
            setRemainingTime((prev) => prev - progressBarSpeed);
        }, progressBarSpeed);
        return () => clearInterval(interval);
    }, []);

    return (
        <progress
            id="question-time"
            value={remainingTime}
            max={timeout}
            className={mode}
        ></progress>
    );
}
