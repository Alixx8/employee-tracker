import pg from "pg"
import fs from "node:fs"
import path  from "node:path";

async function initDB() {
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

async function getRatings(dbConn) {
    return await dbConn.query('SELECT * FROM ratings');
}

async function createRating(dbConn, rating) {
    return await dbConn.query('INSERT INTO ratings(employeeID, days, rating) VALUES ($1, $2, $3) RETURNING *', 
        [rating.employeeID, rating.days, rating.rating]
    );
}


async function updateRating(dbConn, id, rating) {
    return await dbConn.query('UPDATE ratings SET days = $1, rating = $2 WHERE id = $3 RETURNING *', 
        [rating.days, rating.rating, id]
    );
}


async function deleteRating(dbConn, id) {
    return await dbConn.query('DELETE FROM ratings WHERE id = $1', 
        [id]
    );
}

export default {
    initDB,
    getRatings,
    createRating,
    deleteRating,
    updateRating,
}