import pg from "pg"
import fs from "node:fs"
import path  from "node:path";

export async function initDB() {
    const db = new pg.Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'postgres',
        port: 5432
    });

    const query = await fs.promises.readFile(path.resolve('db.schema'), 'utf8');
    await db.query(query);

    return db
}