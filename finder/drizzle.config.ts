import type { Config } from "drizzle-kit";
export default {
	schema: "./src/lib/db/models/schema.ts",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.VITE_DATABASE_URL,
	}
} satisfies Config;
