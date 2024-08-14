import React from "react";
import Todo from "../models/todo";
import classes from "./TodoItem.module.css";
const TodoItem: React.FC<{
    todo: Todo;
    onRemoveTodo: (id: string) => void;
}> = ({ todo, onRemoveTodo }) => {
    const removeHandler = () => {
        onRemoveTodo(todo.id);
    };
    return (
        <li className={classes.item} onClick={removeHandler}>
            {todo.text}
        </li>
    );
};

export default TodoItem;
