import { v4 as uuid } from 'uuid'

export const users = [
  { id: '1', email: 'superadmin@test.com', password: 'test', role: 'superadmin' },
  { id: '2', email: 'admin@test.com', password: 'test', role: 'admin' },
  { id: '3', email: 'editor@test.com', password: 'test', role: 'editor' },
  { id: '4', email: 'supervisor@test.com', password: 'test', role: 'supervisor' },
  { id: '5', email: 'manager@test.com', password: 'test', role: 'manager' },
]

export const sessions = new Map()
export const auditLogs = []

// Function to audit user actions
export function logAction(userId, action, ip) {
  auditLogs.push({
    id: uuid(),
    userId,
    action,
    timestamp: new Date().toISOString(),
    ip,
  })
}
