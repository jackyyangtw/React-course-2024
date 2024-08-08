import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchEvent, updateEvent, queryClient } from "../../utils/http.js";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
export default function EditEvent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryKey = ["events", id];
    const { data, error, isError, isPending } = useQuery({
        queryKey,
        queryFn: ({ signal }) => fetchEvent({ id, signal }),
    });

    const { mutate } = useMutation({
        mutationFn: updateEvent,
        onMutate: async (formData) => {
            const { event } = formData;
            // 防止 fetch old data
            await queryClient.cancelQueries(queryKey);
            const preEvent = queryClient.getQueryData(queryKey);
            queryClient.setQueryData(queryKey, event);
            return { preEvent };
        },
        onError: (error, formData, context) => {
            queryClient.setQueryData(queryKey, context.preEvent);
        },
        onSettled: () => {
            // 馬上發送 events 的 request 取得最新的資料，並使相關的 query 無效
            queryClient.invalidateQueries(queryKey);
        },
    });

    function handleSubmit(formData) {
        mutate({ id, event: formData });
        navigate("../");
    }

    function handleClose() {
        navigate("../");
    }

    let content;
    if (isPending) {
        content = (
            <div className="center">
                <LoadingIndicator />
            </div>
        );
    }
    if (isError) {
        content = (
            <>
                <ErrorBlock title="Error" message={error.info?.message} />
                <div className="form-actions">
                    <Link to="../" className="button">
                        Okay
                    </Link>
                </div>
            </>
        );
    }
    if (data) {
        content = (
            <EventForm inputData={data} onSubmit={handleSubmit}>
                <Link to="../" className="button-text">
                    Cancel
                </Link>
                <button type="submit" className="button">
                    Update
                </button>
            </EventForm>
        );
    }

    return <Modal onClose={handleClose}>{content}</Modal>;
}

// export const loader = ({ params }) => {
//     const { id } = params;
//     return queryClient.fetchQuery({
//         queryKey: ["events", id],
//         queryFn: ({ signal }) => fetchEvent({ id, signal }),
//     });
// };

// export const action = async ({ params, request }) => {
//     const formData = await request.formData();
//     const updatedEventData = Object.fromEntries(formData);
//     await updateEvent({ id: params.id, event: updatedEventData });
//     await queryClient.invalidateQueries(["events", params.id]);
//     return redirect("../");
// };
