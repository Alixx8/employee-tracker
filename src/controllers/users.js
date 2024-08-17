import dal from '../dal/users.js';
import express from 'express';

function mountUsers(app, dbConn) {
    app.use(express.json());

    app.get('/users', async (req, res) => {
    try {
      const result =  await dal.getUsers(dbConn)
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.post('/users', async (req, res) => {
    try {
      const user = req.body
      const result =  await dal.createUser(dbConn, user)
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
      const result =  await dal.deleteUser(dbConn, id)
      res.json({"msg": "deleted successfully"});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

}

export {
  mountUsers
}