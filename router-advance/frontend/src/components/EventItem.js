import classes from "./EventItem.module.css";
import { Link, useSubmit } from "react-router-dom";
function EventItem({ event }) {
    const submit = useSubmit();
    function startDeleteHandler() {
        const proceed = window.confirm(
            "Are you sure you want to delete this event?"
        );
        if (proceed) {
            // 傳遞 null 作為第一個參數，因為我們不需要傳遞任何資料
            // 第二個參數是選項物件，我們可以指定要使用的 HTTP 方法
            submit(null, { method: "DELETE" });
        }
    }

    return (
        <article className={classes.event}>
            <img src={event.image} alt={event.title} />
            <h1>{event.title}</h1>
            <time>{event.date}</time>
            <p>{event.description}</p>
            <menu className={classes.actions}>
                <Link to="edit">Edit</Link>
                <button onClick={startDeleteHandler}>Delete</button>
            </menu>
        </article>
    );
}

export default EventItem;
