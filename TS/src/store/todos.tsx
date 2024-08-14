import Todo from "../models/todo";
import { useState, createContext } from "react";
type TodosContextObj = {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
};
export const TodosContext = createContext<TodosContextObj>({
    items: [],
    addTodo: (text) => {},
    removeTodo: (id) => {},
});

const TodoContextProvider: React.FC = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([
        new Todo("Learn React"),
        new Todo("Learn TypeScript"),
    ]);
    const addTodoHandler = (text: string) => {
        const newTodo = new Todo(text);
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };
    const removeTodoHandler = (todoId: string) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== todoId);
        });
    };
    const value = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler,
    };
    return (
        <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
    );
};

export default TodoContextProvider;
