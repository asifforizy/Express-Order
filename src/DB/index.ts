

import { Pool } from "pg";
import config from "../config";



export const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_95gWixVqXvmd@ep-bitter-boat-aomldaj8-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
    ssl: {
        rejectUnauthorized: false
    }
});



export const initDB = async () => {

    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                age INT NOT NULL,
                password_hash TEXT NOT NULL,
                role VARCHAR(50) NOT NULL DEFAULT 'user',
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now()
            )
        `);
        await pool.query(`
           CREATE TABLE IF NOT EXISTS orders(
                id SERIAL PRIMARY KEY,
                customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                quantity INT NOT NULL CHECK (quantity > 0),
                food TEXT NOT NULL,
                price NUMERIC(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now()
            )
        `);

        console.log("database connected successfully!!!");
    }
    catch (error) {
        console.log(error);
    }
}
