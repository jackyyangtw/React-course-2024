"use server";
import { revalidatePath } from "next/cache";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";

const isInvalidText = (text) => !text || text.trim() === "";

export const shareMeal = async (prevState, formData) => {
    // 因為要使用useFormState，所以第一個參數是prevState
    const meal = {
        title: formData.get("title"),
        summary: formData.get("summary"),
        instructions: formData.get("instructions"),
        image: formData.get("image"),
        creator: formData.get("name"),
        creator_email: formData.get("email"),
    };
    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes("@") ||
        !meal.image ||
        meal.image.size === 0
    ) {
        return {
            message: "Invalid form data",
        };
    }
    await saveMeal(meal);
    revalidatePath("/meals"); // prod重新取得/meals的資料
    redirect("/meals");
};
