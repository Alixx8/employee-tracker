import pg from "pg"
import fs from "node:fs"
import path  from "node:path";

async function getUsers(dbConn) {
    return await dbConn.query('SELECT * FROM users');
}

async function createUser(dbConn, user) {
    return await dbConn.query('INSERT INTO users(email, hash) VALUES ($1, $2) RETURNING *', 
        [user.email, user.hash]
    );
}

async function deleteUser(dbConn, id) {
    return await dbConn.query('DELETE FROM users WHERE id = $1', 
        [id]
    );
}

export default {
    getUsers,
    createUser,
    deleteUser,
}