import express from 'express'
import 'dotenv/config'
import { initDB } from './db.js'

// Initialize DB

try {
    const db = await initDB()
} catch(err) {
    console.log("ERROR: db initializing: " + err)
}


const app = express()
const port = process.env.APP_PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})