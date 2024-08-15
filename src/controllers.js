function makeApp(app, dbConn) {
    app.get('/users', async (req, res) => {
    // Read (GET)
    try {
      const query = 'SELECT * FROM users';
      const result = await dbConn.query(query);
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