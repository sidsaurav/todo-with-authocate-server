const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
const { authocate } = require('authocate-server')
const cors = require('cors')
dotenv.config()
app.use(cors())

app.listen(5000, () => {
  console.log('Server started on port 5000')
})

try {
  mongoose
    .connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((conn) => {
      console.log(`MongoDB connected: ${conn.connection.host}`)
      authocate(app, conn, process.env.JWT_SECRET_KEY)
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`)
      process.exit(1)
    })
} catch (error) {
  console.error(`Error: ${error.message}`)
  process.exit(1)
}
