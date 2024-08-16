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
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.put('/employees/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const employee = req.body
      const result =  await dal.updateEmployee(dbConn, id, employee)
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });


  app.delete('/employees/:id', async (req, res) => {
    const id = req.params.id;

    try {
      const result =  await dal.deleteEmployee(dbConn, id)
      res.json({"msg": "deleted successfully"});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

}

export {
    makeApp
}