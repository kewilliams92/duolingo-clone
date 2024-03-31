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
    console.log("Seeding completed successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
