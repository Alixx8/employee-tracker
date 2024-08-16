import express from 'express'
import 'dotenv/config'
import dal from './dal.js'
import { mountEmployees } from './controllers/employees.js'

// Initialize DB

let db; 
try {
     db = await dal.initDB()
} catch(err) {
    console.log("ERROR: db initializing: " + err)
    throw new Error(err);
}

const app = express()

mountEmployees(app, db)

const port = process.env.APP_PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})