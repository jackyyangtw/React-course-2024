import { Link, useNavigate } from "react-router-dom";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent, queryClient } from "../../utils/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
export default function NewEvent() {
    const navigate = useNavigate();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNewEvent,
        onSuccess: () => {
            // 馬上發送 events 的 request 取得最新的資料
            queryClient.invalidateQueries({
                queryKey: ["events"],
            });
            navigate("/events");
        },
    });

    function handleSubmit(formData) {
        mutate({ event: formData });
    }

    return (
        <Modal onClose={() => navigate("../")}>
            <EventForm onSubmit={handleSubmit}>
                {isPending && <p className="error-text">Creating event...</p>}
                {!isPending && (
                    <>
                        <Link to="../" className="button-text">
                            Cancel
                        </Link>
                        <button type="submit" className="button">
                            Create
                        </button>
                    </>
                )}
            </EventForm>
            {isError && (
                <ErrorBlock
                    title="Fail to create event"
                    message={
                        error.info?.message ||
                        "fail to create event and try again latter"
                    }
                ></ErrorBlock>
            )}
        </Modal>
    );
}
