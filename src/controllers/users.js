import dal from "../dal/users.js";
import express from "express";
import { createHash } from "crypto";
import { validateNewUser, ValidationError } from "../errors.js";

function mountUsers(app, dbConn) {
  app.use(express.json());

  app.get("/users", async (req, res) => {
    if (!req.isAdmin) {
      res.status(401);
      res.json({ error: "not authorized" });
      return;
    }
    try {
      const result = await dal.getUsers(dbConn);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  });

  app.post("/users", async (req, res) => {
    if (!req.isAdmin) {
      res.status(401);
      res.json({ error: "not authorized" });
      return;
    }
    try {
      const user = req.body;
      validateNewUser(user);

      user.hash = createHash("sha256").update(user.password).digest("hex");

      const result = await dal.createUser(dbConn, user);
      res.json(result.rows[0]);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(400).json({ errs: err.errs });
        return;
      }
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  });

  app.delete("/users/:id", async (req, res) => {
    if (!req.isAdmin) {
      res.status(401);
      res.json({ error: "not authorized" });
      return;
    }

    const id = req.params.id;

    try {
      const result = await dal.deleteUser(dbConn, id);
      res.json({ msg: "deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  });
}

export { mountUsers };
