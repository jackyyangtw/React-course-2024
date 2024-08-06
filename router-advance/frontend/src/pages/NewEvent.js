import EventForm from "../components/EventForm";
import { json, redirect } from "react-router-dom";
export default function NewEventPage() {
    return <EventForm method="post"></EventForm>;
}

export const action = async ({ request, params }) => {
    const data = await request.formData();
    const eventData = {
        title: data.get("title"),
        image: data.get("image"),
        date: data.get("date"),
        description: data.get("description"),
    };
    const res = await fetch("http://localhost:8080/events", {
        method: "POST",
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
