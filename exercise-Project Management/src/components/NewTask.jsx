import { useState } from "react";

export default function NewTask({ onAdd }) {
    const [task, setTask] = useState("");
    const handleOnChage = (e) => {
        setTask(e.target.value);
    };
    const handleOnAdd = () => {
        onAdd(task);
        setTask("");
    };
    return (
        <div className="flex items-center gap-4">
            <input
                type="text"
                className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                value={task}
                onChange={handleOnChage}
            />
            <button
                onClick={handleOnAdd}
                className="text-stone-700 hover:text-stone-950"
            >
                Add Task
            </button>
        </div>
    );
}
