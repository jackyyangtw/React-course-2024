import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";
export default function EditEventPage() {
    // 讓 chikdren 可以使用 loader data，必須使用 useRouteLoaderData
    const { event } = useRouteLoaderData("event-details");
    return <EventForm event={event} />;
}
