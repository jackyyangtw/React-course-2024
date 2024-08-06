import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
export default function ErrorPage() {
    const { status, data } = useRouteError();
    let title;
    let message;
    if (status === 404) {
        title = "Not Found";
        message = "The page you are looking for does not exist.";
    }
    if (status === 500) {
        title = "Server Error";
        message = data.message;
    }
    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    );
}
