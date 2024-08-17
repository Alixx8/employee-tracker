import dal from "../dal/users.js";
import { createHash } from 'crypto';


function makeAuthenticationMW(dbConn) {
  return async (req, res, next) => {
    const authheader = req.headers.authorization;

    if (!authheader) {
      res.status(401);
      res.json({ error: "missing authorization header" });
      return;
    }

    const auth = new Buffer.from(authheader.split(" ")[1], "base64")
      .toString()
      .split(":");
    const user = auth[0];
    const pass = auth[1];
    const passHash = createHash('sha256').update(pass).digest('hex');

    let result;
    try {
      result = await dal.getAuthUser(dbConn, user, passHash);
    } catch (err) {
      res.status(500);
      res.json({ error: "internal server error" });
      return;
    }

    if (result.rows.length === 0) {
      res.status(401);
      res.json({ error: "invalid user or password" });
      return;
    }
    const authUser = result.rows[0];
    req.isAdmin = authUser.isAdmin;

    next();
  };
}

export { makeAuthenticationMW };
