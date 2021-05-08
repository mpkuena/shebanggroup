import express from 'express'
import cors from 'cors'
import businesses from './api/businesses.route.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/businesses', businesses)
app.use('*', (req, res) =>{
  res.status(404).json({ error: "Not found"})
})

export default app