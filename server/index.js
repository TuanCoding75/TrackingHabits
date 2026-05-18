import express from 'express'
import cors from 'cors'
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

app.use(cors())
app.use(express.json())

app.get('/api/health', async (req, res) => {
  const result = await pool.query('SELECT NOW()')
  res.json(result.rows[0])
})

app.listen(3001, () => console.log('Server running on port 3001'))