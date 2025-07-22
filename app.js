import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { users, sessions, auditLogs, logAction } from './db.js'
import { v4 as uuid } from 'uuid'

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

// Helper to extract token from header
function getToken(req) {
  const auth = req.headers.authorization || ''
  return auth.replace(/^Bearer\s+/, '')
}

// GET USERS: returns list of users
app.get('/auth/users', (req, res) => {
  // Retornamos sin passwords para seguridad
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const publicUsers = users.map(({ password, ...user }) => user)
  return res.json(publicUsers)
})

// LOGIN: generates session and logs audit
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find((u) => u.email === email && u.password === password)
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const token = uuid()
  sessions.set(token, { userId: user.id, createdAt: Date.now() })
  logAction(user.id, 'login', req.ip)

  res.cookie('sessionToken', token, { httpOnly: true })
  return res.json({ token, user: { id: user.id, email: user.email, role: user.role } })
})

// LOGOUT: deletes session and logs audit
app.post('/auth/logout', (req, res) => {
  const token = getToken(req) || req.cookies.sessionToken
  const session = sessions.get(token)
  if (!session) return res.status(400).json({ message: 'Session not found' })

  sessions.delete(token)
  logAction(session.userId, 'logout', req.ip)
  res.clearCookie('sessionToken')
  return res.json({ message: 'Logged out' })
})

// VERIFY: checks session validity
app.post('/auth/verify', (req, res) => {
  const token = getToken(req) || req.cookies.sessionToken
  const session = sessions.get(token)
  if (!session) return res.status(401).json({ valid: false })

  // This check is missing
  const user = users.find((u) => u.id === session.userId)

  return res.json({ valid: true, user: { id: user.id, email: user.email, role: user.role } })
})

// GET AUDIT LOGS: endpoint to view audits (dev only)
app.get('/auth/logs', (req, res) => {
  return res.json(auditLogs)
})

// Start server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Fake Auth API listening on port ${PORT}`)
})
