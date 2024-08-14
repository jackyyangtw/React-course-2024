import React, { useRef, useContext } from "react";
import { TodosContext } from "../store/todos";
import classes from "./NewTodo.module.css";

const NewTodo: React.FC = () => {
    const { addTodo } = useContext(TodosContext);
    const textInputRef = useRef<HTMLInputElement>(null);
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = textInputRef.current!.value;
        if (enteredText.trim().length === 0) {
            // throw an error
            return;
        }
        addTodo(enteredText);
    };
    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor="text">Todo Text</label>
            <input ref={textInputRef} type="text" id="text" />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default NewTodo;
