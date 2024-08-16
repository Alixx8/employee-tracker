import dal from '../dal/ratings.js';
import express from 'express';


function mountRatings(app, dbConn) {
    app.use(express.json());

    app.get('/employees/:empId/ratings', async (req, res) => {
      const empId = req.params.empId;
      
    try {
      const result =  await dal.getRatings(dbConn, empId)
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.post('/employees/:empId/ratings', async (req, res) => {
    const empId = req.params.empId;

    try {
      const rating = req.body
      const result =  await dal.createRating(dbConn, empId, rating)
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.put('/employees/:empId/ratings/:id', async (req, res) => {
    const empId = req.params.empId;
    const id = req.params.id;

    try {
      const rating = req.body
      const result =  await dal.updateRating(dbConn, empId, id, rating)
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });


  app.delete('/employees/:empId/ratings/:id', async (req, res) => {
    const empId = req.params.empId;
    const id = req.params.id;

    try {
      const result =  await dal.deleteRating(dbConn, empId, id)
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