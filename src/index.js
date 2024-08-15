import express from 'express'
import 'dotenv/config'
import { initDB } from './db.js'
import { makeApp } from './controllers.js'

// Initialize DB

let db; 
try {
    db = await initDB()
} catch(err) {
    console.log("ERROR: db initializing: " + err)
}

const app = express()

makeApp(app, db)

const port = process.env.APP_PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})