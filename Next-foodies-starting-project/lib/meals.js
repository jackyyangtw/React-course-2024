import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
const db = sql("meals.db");

export async function getMeals() {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // throw new Error("Failed to fetch meals");
    return db.prepare("SELECT * FROM meals").all();
}

export async function getMeal(id) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(id);
}

export async function saveMeal(meal) {
    // create slug
    meal.slug = slugify(meal.title, { lower: true });

    // 防止XSS攻擊
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split(".").pop();
    const filename = `${meal.slug}.${extension}`;
    const stream = fs.createWriteStream(`public/images/${filename}`);

    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error("Failed to save image");
        }
    });
    meal.image = `/images/${filename}`;
    db.prepare(
        `INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug)
        VALUES (@title, @summary, @instructions, @image, @creator, @creator_email, @slug)
        `
    ).run(meal);
}
