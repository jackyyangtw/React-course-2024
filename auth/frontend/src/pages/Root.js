import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { useEffect } from "react";
import MainNavigation from "../components/MainNavigation";
import { getTokenDuration } from "../utils/auth";
function RootLayout() {
    const toekn = useLoaderData();
    const submit = useSubmit();
    useEffect(() => {
        // const oneMinute = 1 * 60 * 1000;
        if (!toekn) {
            return;
        }

        if (toekn === "EXPIRED") {
            submit(null, { action: "logout", method: "post" });
            return;
        }

        const tokenDuration = getTokenDuration();
        setTimeout(() => {
            submit(null, { action: "logout", method: "post" });
        }, tokenDuration);
    }, [toekn, submit]);

    return (
        <>
            <MainNavigation />
            <main>
                {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
