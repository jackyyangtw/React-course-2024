import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counter";
const Counter = () => {
    const counter = useSelector((state) => state.counter.counter);
    const showCounter = useSelector((state) => state.counter.showCounter);
    const dispatch = useDispatch();
    const { increment, decrement, increase, toggle } = counterActions;

    const incrementHandler = () => {
        dispatch(increment());
    };
    const decrementHandler = () => {
        dispatch(decrement());
    };
    const increaseHandler = () => {
        dispatch(increase(5));
    };
    const toggleCounterHandler = () => {
        dispatch(toggle());
    };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {showCounter && <div className={classes.value}>{counter}</div>}
            <div>
                <button onClick={incrementHandler}>Increment</button>
                <button onClick={decrementHandler}>Decrement</button>
                <button onClick={increaseHandler}>Increase by 5</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
