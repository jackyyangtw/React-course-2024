import AuthForm from "../components/AuthForm";
import { json, redirect } from "react-router-dom";

export default function AuthenticationPage() {
    return <AuthForm />;
}

export const action = async ({ request }) => {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode") || "login";
    if (mode !== "login" && mode !== "signup") {
        return json({ message: "Invalid mode" }, { status: 422 });
    }

    const data = await request.formData();
    const authData = {
        email: data.get("email"),
        password: data.get("password"),
    };
    const res = await fetch(`http://localhost:8080/${mode}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
    });

    if (res.status === 422 || res.status === 401) {
        return res;
    }
    if (!res.ok) {
        throw json({ message: "Something went wrong" }, { status: 500 });
    }

    const resData = await res.json();
    const { token } = resData;
    localStorage.setItem("token", token);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/");
};
