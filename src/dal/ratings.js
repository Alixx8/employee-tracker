import pg from "pg";
import fs from "node:fs";
import path from "node:path";

async function getRatings(dbConn, empId) {
  return await dbConn.query('SELECT * FROM ratings WHERE "employeeID" = $1', [
    empId,
  ]);
}

async function createRating(dbConn, empId, rating) {
  return await dbConn.query(
    'INSERT INTO ratings("employeeID", days, rating) VALUES ($1, $2, $3) RETURNING *',
    [empId, rating.days, rating.rating]
  );
}

async function updateRating(dbConn, empId, id, rating) {
  return await dbConn.query(
    'UPDATE ratings SET days = $1, rating = $2 WHERE id = $3 AND "employeeID" = $4 RETURNING *',
    [rating.days, rating.rating, id, empId]
  );
}

async function deleteRating(dbConn, empId, id) {
  return await dbConn.query(
    'DELETE FROM ratings WHERE id = $1 AND "employeeID" = $2',
    [id, empId]
  );
}

export default {
  getRatings,
  createRating,
  deleteRating,
  updateRating,
};
