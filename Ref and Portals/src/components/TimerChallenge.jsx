import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef(); // 避免重新初始化、且不觸發重新渲染
    const dialog = useRef();
    const goalTime = targetTime * 1000;
    const [remainingTime, setRemainingTime] = useState(goalTime);
    const timerIsActive = remainingTime > 0 && remainingTime < goalTime;
    const handleStop = () => {
        clearInterval(timer.current);
        dialog.current.open();
    };
    if (remainingTime <= 0) {
        handleStop();
    }
    const handleReset = () => {
        clearInterval(timer.current);
        setRemainingTime(goalTime);
    };
    const handleStart = () => {
        timer.current = setInterval(() => {
            setRemainingTime((prev) => prev - 10);
        }, 10);
    };

    return (
        <>
            <ResultModal
                ref={dialog}
                targetTime={targetTime}
                remainingTime={remainingTime}
                onReset={handleReset}
            />
            <section className="challenge">
                <h2>{title}</h2>
                {/* {expired && <p className="challenge-expired">You lost !</p>} */}
                <p className="challenge-time">
                    {targetTime} seconds{targetTime > 1 ? "s" : ""}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? "Stop" : "Start"}
                    </button>
                </p>
                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? "Time is running" : "Timer inactive"}
                </p>
            </section>
        </>
    );
}
