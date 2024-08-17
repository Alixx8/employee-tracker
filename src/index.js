import express from "express";
import "dotenv/config";
import dal from "./dal/employees.js";
import { mountEmployees } from "./controllers/employees.js";
import { mountRatings } from "./controllers/ratings.js";
import { mountUsers } from "./controllers/users.js";
import { makeAuthenticationMW } from "./controllers/index.js";

// Initialize DB

let db;
try {
  db = await dal.initDB();
} catch (err) {
  console.log("ERROR: db initializing: " + err);
  throw new Error(err);
}

const app = express();

app.use(makeAuthenticationMW(db));
mountUsers(app, db);
mountEmployees(app, db);
mountRatings(app, db);

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`INFO: app listening on port ${port}`);
});
