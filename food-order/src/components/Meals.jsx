import Meal from "./Meal";
import { useEffect, useState } from "react";
import { getMeals } from "../http";
export default function Meals() {
    const [meals, setMeals] = useState([]);
    useEffect(() => {
        const GETMEALS = async () => {
            try {
                const meals = await getMeals();
                setMeals(meals);
            } catch (error) {
                console.error(error);
            }
        };
        GETMEALS();
    }, []);
    return (
        <div id="meals">
            {meals.map((meal, index) => (
                <Meal key={index} meal={meal} />
            ))}
        </div>
    );
}
