import { json, useRouteLoaderData } from "react-router-dom";
import EvetItem from "../components/EventItem";
export default function EventDetailPage() {
    // 讓 chikdren 可以使用 loader data，必須使用 useRouteLoaderData
    const { event } = useRouteLoaderData("event-details");
    return <EvetItem event={event}></EvetItem>;
}

export const loader = async ({ resuest, params }) => {
    const res = await fetch(`http://localhost:8080/events/${params.id}`);
    if (!res.ok) {
        throw json(
            { message: `Could not fetch /events/${params.id}` },
            { status: 500 }
        );
    }
    return res;
};
