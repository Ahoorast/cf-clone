import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	schema: "./src/lib/db/models/schema.ts",
	out: "./drizzle",
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.VITE_DATABASE_URL,
	},
	verbose: true,
	strict: true,
});
