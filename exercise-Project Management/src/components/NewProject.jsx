import { useRef } from "react";

import Input from "./Input.jsx";
import Modal from "./Modal.jsx";

export default function NewProject({ onAddProject, onCancel }) {
    const titleRef = useRef(null);
    const textareaRef = useRef(null);
    const dueDateRef = useRef(null);
    const handleAddProject = () => {
        const title = titleRef.current.value;
        const description = textareaRef.current.value;
        const dueDate = dueDateRef.current.value;
        const id = Math.floor(Math.random() * 1000);
        if (!title || !description || !dueDate) return;
        onAddProject({ title, description, dueDate, id, tasks: [] });
    };
    return (
        <>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button
                            onClick={onCancel}
                            className="text-stone-800 hover:text-stone-950"
                        >
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handleAddProject}
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                        >
                            Add
                        </button>
                    </li>
                </menu>
                <div>
                    <Input ref={titleRef} type="text" label="Title" />
                    <Input ref={textareaRef} label="Description" textarea />
                    <Input ref={dueDateRef} type="date" label="Due Date" />
                </div>
            </div>
        </>
    );
}
