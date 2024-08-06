import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

export default function EventsPage() {
    const { events } = useLoaderData();
    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={events}>
                    {(events) => <EventsList events={events}></EventsList>}
                </Await>
            </Suspense>
        </>
    );
}

// execute at frontend
// not a component, can not use reack hooks
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
export const loader = () => {
    return defer({
        events: loadEvents(),
    });
};
