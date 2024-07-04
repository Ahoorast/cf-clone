import * as schema from '$schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config({
    path: '../../../.env',
});

const queryClient = postgres(process.env.VITE_DATABASE_URL);
export const db = drizzle(queryClient,{ schema });
