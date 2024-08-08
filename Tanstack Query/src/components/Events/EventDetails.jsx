import { Link, Outlet } from "react-router-dom";

import Header from "../Header.jsx";
import { fetchEvent, deleteEvent, queryClient } from "../../utils/http.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
export default function EventDetails() {
    const [isDeleting, setIsDeleting] = useState(false);
    const { id } = useParams();
    const { data, isPending } = useQuery({
        queryKey: ["events", id],
        queryFn: ({ signal }) => fetchEvent({ id, signal }),
    });
    const navigate = useNavigate();
    const {
        mutate,
        isPending: isPendingDelete,
        isError: isErrorDelete,
        error: deleteError,
    } = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["events"],
                refetchType: "none", // 防止馬上重新發送請求 造成404 error
            });
            navigate("/events");
        },
    });
    const handleStartDelete = () => {
        setIsDeleting(true);
    };
    const handleCancelDelete = () => {
        setIsDeleting(false);
    };
    const handleDelete = () => {
        mutate({ id });
    };

    let content;
    if (isPending) {
        content = (
            <div id="event-details-content">
                <p>Loading...</p>
            </div>
        );
    }
    if (data) {
        const { image, title, date, time, location, description } = data;
        const imgUrl = `http://localhost:3000/${image}`;
        const formatDate = new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
        content = (
            <>
                <header>
                    <h1>{title}</h1>
                    <nav>
                        <button onClick={handleStartDelete}>Delete</button>
                        <Link to="edit">Edit</Link>
                    </nav>
                </header>
                <div id="event-details-content">
                    <img src={imgUrl} alt="" />
                    <div id="event-details-info">
                        <div>
                            <p id="event-details-location">{location}</p>
                            <time dateTime={`Todo-DateT$Todo-Time`}>
                                {formatDate} @ {time}
                            </time>
                        </div>
                        <p id="event-details-description">{description}</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            {isDeleting && (
                <Modal onClose={handleCancelDelete}>
                    <h2>Are you sure ?</h2>
                    <p>Do you want to delete this event ?</p>
                    <div className="form-actions">
                        {isPendingDelete && <p>Deleting...</p>}
                        {!isPendingDelete && (
                            <>
                                <button
                                    className="button-text"
                                    onClick={handleCancelDelete}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="button"
                                    onClick={handleDelete}
                                >
                                    Confirm
                                </button>
                            </>
                        )}
                    </div>
                    {isErrorDelete && (
                        <ErrorBlock
                            error={
                                deleteError.info?.message || "Fail to delete"
                            }
                            title="Fail to delete"
                        />
                    )}
                </Modal>
            )}
            <Outlet />
            <Header>
                <Link to="/events" className="nav-item">
                    View all Events
                </Link>
            </Header>
            <article id="event-details">{content}</article>
        </>
    );
}
