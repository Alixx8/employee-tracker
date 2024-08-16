import dal from '../dal/employees.js';
import express from 'express';


function mountRatings(app, dbConn) {
    app.use(express.json());

    app.get('/ratings', async (req, res) => {
    try {
      const result =  await dal.getRatings(dbConn)
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.post('/ratings', async (req, res) => {
    try {
      const rating = req.body
      const result =  await dal.createRatings(dbConn, rating)
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.put('/ratings/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const rating = req.body
      const result =  await dal.updateRatings(dbConn, id, rating)
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });


  app.delete('/ratings/:id', async (req, res) => {
    const id = req.params.id;

    try {
      const result =  await dal.deleteRatings(dbConn, id)
      res.json({"msg": "deleted successfully"});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

}

export {
  mountRatings
}