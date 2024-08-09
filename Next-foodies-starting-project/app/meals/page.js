import classes from "./page.module.css";
import Link from "next/link";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

const Meals = async () => {
    const meals = await getMeals();
    return <MealsGrid meals={meals} />;
};

const Loading = () => {
    return <p className={classes.loading}>Fetching meals...</p>;
};

export default function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Meals <span className={classes.highlight}>by you</span>
                </h1>
                <p>
                    Choose your favorite meal from our broad selection of
                    available meals and enjoy a delicious lunch or dinner at
                    home.
                </p>
                <p className={classes.cta}>
                    <Link href="/meals/share">Share Your favorite recipe</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<Loading />}>
                    <Meals></Meals>
                </Suspense>
            </main>
        </>
    );
}
