import { useState } from "react";

export default function NewTask({ onAddTask, project }) {
    const [taskText, seTaskText] = useState("");
    const handleOnChage = (e) => {
        seTaskText(e.target.value);
    };
    const handleOnAddTask = () => {
        onAddTask({
            text: taskText,
            id: Math.random().toString(),
            projectId: project.id,
        });
        seTaskText("");
    };
    return (
        <div className="flex items-center gap-4">
            <input
                type="text"
                className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                value={taskText}
                onChange={handleOnChage}
            />
            <button
                onClick={handleOnAddTask}
                className="text-stone-700 hover:text-stone-950"
            >
                Add Task
            </button>
        </div>
    );
}
