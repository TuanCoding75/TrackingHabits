import express from 'express'
import cors from 'cors'
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const { Pool } = pg

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

app.use(cors())
app.use(express.json())

// ─── HABITS ───────────────────────────────────────

// GET tous les habits
app.get('/api/habits', async (req, res) => {
  const result = await pool.query('SELECT * FROM habit ORDER BY created_at DESC')
  res.json(result.rows)
})

// POST créer un habit
app.post('/api/habits', async (req, res) => {
  const { name, type, notes } = req.body
  const result = await pool.query(
    'INSERT INTO habit (name, type, notes) VALUES ($1, $2, $3) RETURNING *',
    [name, type, notes]
  )
  res.status(201).json(result.rows[0])
})

// DELETE supprimer un habit
app.delete('/api/habits/:id', async (req, res) => {
  await pool.query('DELETE FROM habit WHERE id = $1', [req.params.id])
  res.json({ message: 'Habit supprimé' })
})

// ─── SESSIONS ─────────────────────────────────────

// GET toutes les sessions d'un habit
app.get('/api/habits/:id/sessions', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM session WHERE habit_id = $1 ORDER BY date DESC',
    [req.params.id]
  )
  res.json(result.rows)
})

// POST créer une session
app.post('/api/habits/:id/sessions', async (req, res) => {
  const { date, duree, data, notes } = req.body
  const result = await pool.query(
    'INSERT INTO session (habit_id, date, duree, data, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [req.params.id, date, duree, data, notes]
  )
  res.status(201).json(result.rows[0])
})

// DELETE supprimer une session
app.delete('/api/sessions/:id', async (req, res) => {
  await pool.query('DELETE FROM session WHERE id = $1', [req.params.id])
  res.json({ message: 'Session supprimée' })
})

app.listen(3001, () => console.log('Server running on port 3001'))