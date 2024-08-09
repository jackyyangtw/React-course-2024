"use client";
export default function MealsErrorPage({ error }) {
    return (
        <main className="error">
            <h1>An Error occured!</h1>
            <p>{error.message}</p>
        </main>
    );
}
