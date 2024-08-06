import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
export default function RootLayout() {
    const { state } = useNavigation();
    return (
        <>
            <MainNavigation />
            <main>
                {state === "loading" && <p>Loading...</p>}
                <Outlet />
            </main>
        </>
    );
}
