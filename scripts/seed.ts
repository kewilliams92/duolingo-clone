import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../database/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 2,
        title: "Arabic",
        imageSrc: "/ar.svg",
      },
      {
        id: 3,
        title: "English",
        imageSrc: "/en.svg",
      },
      {
        id: 4,
        title: "German",
        imageSrc: "/de.svg",
      },
      {
        id: 5,
        title: "Italian",
        imageSrc: "/it.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // Spanish
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 (Learn the basics of...)
        title: "Nouns",
        order: 1,
      },
      {
        id: 2,
        unitId: 1, // Unit 1 (Learn the basics of...)
        title: "Verbs",
        order: 2,
      },
      {
        id: 3,
        unitId: 1, // Unit 1 (Learn the basics of...)
        title: "Nouns",
        order: 3,
      },
      {
        id: 4,
        unitId: 1, // Unit 1 (Learn the basics of...)
        title: "Verbs",
        order: 4,
      },
      {
        id: 5,
        unitId: 1, // Unit 1 (Learn the basics of...)
        title: "Nouns",
        order: 5,
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the Spanish for "the dog"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1, // Which one of these is the Spanish for "the dog"?
        imageSrc: "/dog.svg",
        correct: true,
        text: "El perro",
        audioSrc: "/es_dog.mp3",
      },
      {
        id: 2,
        challengeId: 1, // Which one of these is the Spanish for "the dog"?
        imageSrc: "/chicken.svg",
        correct: false,
        text: "El pollo",
        audioSrc: "/es_chicken.mp3",
      },
      {
        id: 3,
        challengeId: 1, // Which one of these is the Spanish for "the dog"?
        imageSrc: "/goat.svg",
        correct: false,
        text: "El cabra",
        audioSrc: "/es_goat.mp3",
      },
    ]);

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
