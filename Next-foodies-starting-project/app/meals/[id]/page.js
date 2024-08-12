import classes from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

// dynamic metadata
export const generateMetadata = async ({ params }) => {
    const meal = await getMeal(params.id);
    if (!meal) {
        return notFound();
    }
    return {
        title: `Meal: ${meal.title}`,
        description: `Details for meal with ID ${meal.description}`,
    };
};

export default async function MealsDetails({ params }) {
    const meal = await getMeal(params.id);
    if (!meal) {
        return notFound();
    }
    const { title, image, summary, creator, creator_email } = meal;
    meal.instructions = meal.instructions.replace(/\n/g, "<br>");
    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image fill src={image} alt={title} />
                </div>
                <div className={classes.headerText}>
                    <h1>{title}</h1>
                    <p className={classes.creator}>
                        by <a href={`${creator_email}`}>{creator}</a>
                    </p>
                    <p className={classes.summary}>{summary}</p>
                </div>
            </header>
            <main>
                <p
                    className={classes.instructions}
                    dangerouslySetInnerHTML={{
                        __html: meal.instructions,
                    }}
                ></p>
            </main>
        </>
    );
}
