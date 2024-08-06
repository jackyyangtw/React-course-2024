import {
    Form,
    useNavigation,
    useNavigate,
    useActionData,
    redirect,
    json,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
    const data = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const navigate = useNavigate();
    function cancelHandler() {
        navigate("..");
    }

    // defaultValue 用來設定 props input 的預設值
    return (
        <Form method={method} className={classes.form}>
            {data && data.message && (
                <ul>
                    {Object.values(data.errors).map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}
            <p>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    defaultValue={event ? event.title : ""}
                />
            </p>
            <p>
                <label htmlFor="image">Image</label>
                <input
                    id="image"
                    type="url"
                    name="image"
                    defaultValue={event ? event.image : ""}
                />
            </p>
            <p>
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    defaultValue={event ? event.date : ""}
                />
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows="5"
                    defaultValue={event ? event.description : ""}
                />
            </p>
            <div className={classes.actions}>
                <button type="button" onClick={cancelHandler}>
                    Cancel
                </button>
                <button disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Save"}
                </button>
            </div>
        </Form>
    );
}

export default EventForm;

export const action = async ({ request, params }) => {
    const { method } = request;
    const data = await request.formData();
    const eventData = {
        title: data.get("title"),
        image: data.get("image"),
        date: data.get("date"),
        description: data.get("description"),
    };

    let url = "http://localhost:8080/events/";
    if (method === "PATCH") {
        url += params.id;
        console.log(url);
    }
    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData), // 轉為 JSON 字串
    });

    if (res.status === 422) {
        return res;
    }
    if (!res.ok) {
        throw json(
            { message: "Failed to create event" },
            { status: res.status }
        );
    }
    return redirect("/events");
};
