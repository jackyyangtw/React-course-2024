import { useEffect, useState } from "react";
const TIMEOUT = 3000;
const progressDuration = 10;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
    const [remainingTime, setRemainingTime] = useState(TIMEOUT);
    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prev) => prev - progressDuration);
        }, progressDuration);
        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        console.log("timer start");
        const timer = setTimeout(() => {
            onConfirm();
        }, TIMEOUT);
        return () => {
            clearTimeout(timer);
            console.log("timer clear");
        };
    }, [onConfirm]);
    return (
        <div id="delete-confirmation">
            <h2>Are you sure?</h2>
            <p>Do you really want to remove this place?</p>
            <div id="confirmation-actions">
                <button onClick={onCancel} className="button-text">
                    No
                </button>
                <button onClick={onConfirm} className="button">
                    Yes
                </button>
            </div>
            <progress value={remainingTime} max={TIMEOUT} />
        </div>
    );
}
