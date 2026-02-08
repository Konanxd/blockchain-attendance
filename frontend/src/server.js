import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API running')
})

app.post('/login', (req, res) => {
  const { email } = req.body
  res.json({ message: 'Logged in', email })
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
