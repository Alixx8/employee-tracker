import pg from "pg";
import fs from "node:fs";
import path from "node:path";

async function getUsers(dbConn) {
  return await dbConn.query('SELECT email, "isAdmin" FROM users');
}

async function getAuthUser(dbConn, email, hash) {
  return await dbConn.query(
    'SELECT email, hash, "isAdmin" FROM users WHERE email = $1 AND hash = $2',
    [email, hash]
  );
}

async function createUser(dbConn, user) {
  return await dbConn.query(
    'INSERT INTO users(email, hash, "isAdmin") VALUES ($1, $2, $3) RETURNING *',
    [user.email, user.hash, user.isAdmin]
  );
}

async function deleteUser(dbConn, id) {
  return await dbConn.query("DELETE FROM users WHERE id = $1", [id]);
}

export default {
  getUsers,
  getAuthUser,
  createUser,
  deleteUser,
};
