import dal from './dal.js';
import express from 'express';


function makeApp(app, dbConn) {
    app.use(express.json());

    app.get('/employees', async (req, res) => {
    try {
      const result =  await dal.getEmployees(dbConn)
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.post('/employees', async (req, res) => {
    try {
      const employee = req.body
      const result =  await dal.createEmployee(dbConn, employee)
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

}

export {
    makeApp
}