import {
    json,
    useRouteLoaderData,
    redirect,
    defer,
    Await,
} from "react-router-dom";
import { Suspense } from "react";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

export default function EventDetailPage() {
    // 讓 chikdren 可以使用 loader data，必須使用 useRouteLoaderData
    const { event, events } = useRouteLoaderData("event-details");
    return (
        <>
            <Suspense fallback={<p>Loading event...</p>}>
                <Await resolve={event}>
                    {(event) => <EventItem event={event}></EventItem>}
                </Await>
            </Suspense>
            <Suspense fallback={<p>Loading events...</p>}>
                <Await resolve={events}>
                    {(events) => <EventsList events={events}></EventsList>}
                </Await>
            </Suspense>
        </>
    );
}

const host = "http://localhost:8080";
const fetchedRoute = "events";
const loadEvents = async () => {
    const response = await fetch(`${host}/${fetchedRoute}`);
    if (!response.ok) {
        throw json(
            { message: `Could not fetch /${fetchedRoute}` },
            { status: 500 }
        );
    } else {
        const { events } = await response.json();
        return events;
    }
};

const loadEvent = async (id) => {
    const response = await fetch(`${host}/events/${id}`);
    if (!response.ok) {
        throw json(
            { message: `Could not fetch /events/${id}` },
            { status: 500 }
        );
    } else {
        const { event } = await response.json();
        return event;
    }
};
export const loader = async ({ params }) => {
    const { id } = params;
    return defer({
        event: await loadEvent(id),
        events: loadEvents(),
    });
};

export const action = async ({ params, request }) => {
    const { id } = params;
    const { method } = request;
    const res = await fetch(`http://localhost:8080/events/${id}`, {
        method,
    });
    if (!res.ok) {
        throw json(
            { message: `Could not fetch /events/${id}` },
            { status: 500 }
        );
    }
    return redirect(`/events`);
};
