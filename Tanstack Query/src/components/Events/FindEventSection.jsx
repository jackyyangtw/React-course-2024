import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../utils/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
export default function FindEventSection() {
    const searchElement = useRef();
    const [searchTerm, setSearchTerm] = useState();

    // isLoading: 當 disable 的時候不會為 true，因此不會顯示 loading indicator。但 isPending 則會顯示 loading indicator
    const { data, isLoading, error, isError } = useQuery({
        queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
        queryKey: [{ search: searchTerm }, "events"], // 同時使用 search term 和 events 作為 cache key
        enabled: searchTerm !== undefined, // 當 search term 為空時不發送 request
    });

    function handleSubmit(event) {
        event.preventDefault();
        setSearchTerm(searchElement.current.value);
    }

    let content = <p>Please enter a search term</p>;
    if (isLoading) {
        content = <LoadingIndicator></LoadingIndicator>;
    }
    if (isError) {
        content = (
            <ErrorBlock
                title="An error occred"
                message={error.info?.message || "Fail to fetch events"}
            ></ErrorBlock>
        );
    }
    if (data) {
        content = (
            <ul className="events-list">
                {data.map((event) => (
                    <li key={event.id}>
                        <EventItem event={event}></EventItem>
                    </li>
                ))}
            </ul>
        );
    }
    return (
        <section className="content-section" id="all-events-section">
            <header>
                <h2>Find your next event!</h2>
                <form onSubmit={handleSubmit} id="search-form">
                    <input
                        type="search"
                        placeholder="Search events"
                        ref={searchElement}
                    />
                    <button>Search</button>
                </form>
            </header>
            {content}
        </section>
    );
}
