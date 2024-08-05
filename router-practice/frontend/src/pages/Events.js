import { useLoaderData, json } from "react-router-dom";

import EventsList from "../components/EventsList";

export default function EventsPage() {
    const data = useLoaderData();
    const { events, isError } = data;
    if (isError) {
        return <p>{data.message}</p>;
    }
    return (
        <>
            <EventsList events={events}></EventsList>
        </>
    );
}

// execute at frontend
// not a component, can not use reack hooks
const host = "http://localhost:8080";
const fetchedRoute = "events";
export const loader = async () => {
    const response = await fetch(`${host}/${fetchedRoute}`);
    if (!response.ok) {
        // throw new Response(
        //     JSON.stringify({ message: `Could not fetch /${fetchedRoute}` }),
        //     {
        //         status: 500,
        //     }
        // );
        throw json(
            { message: `Could not fetch /${fetchedRoute}` },
            { status: 500 }
        );
    } else {
        return response;
    }
};
