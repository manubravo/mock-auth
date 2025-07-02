# 🛡️ Mock Auth API

**Fake authentication API** for development and testing environments. Ideal for quick integrations with frontends or microservices that require login/logout/verify without implementing a real authentication system.

## 🚀 Features

- **Login and Logout** with cookies or Bearer token.
- **Session verification** (`/auth/verify`).
- **User listing** without passwords.
- **Audit logs** for every login/logout.
- **In-memory sessions** (Map).

## 📦 Installation

```bash
git clone https://github.com/manubravo/mock-auth
cd mock-auth
npm install
```

## ▶️ Usage

```bash
npm start
```

By default, it listens on `http://localhost:4000`.

## 📚 Available Endpoints

### `GET /auth/users`
Returns all available users **without** passwords.  
_💡 Useful to see which users are available for testing._

---

### `POST /auth/login`

**Body:**
```json
{
  "email": "superadmin@test.com",
  "password": "test"
}
```

**Response:**
```json
{
  "token": "uuid-token",
  "user": {
    "id": "1",
    "email": "superadmin@test.com",
    "role": "superadmin"
  }
}
```

> 📝 Also sets a `sessionToken` cookie.

---

### `POST /auth/logout`

Closes the current session and deletes the token.

- Supports:
  - Header: `Authorization: Bearer <token>`
  - Cookie: `sessionToken`

---

### `POST /auth/verify`

Checks if a session is valid.

- Supports:
  - Header: `Authorization: Bearer <token>`
  - Cookie: `sessionToken`

**Response if valid:**
```json
{
  "valid": true,
  "user": {
    "id": "1",
    "email": "superadmin@test.com",
    "role": "superadmin"
  }
}
```

---

### `GET /auth/logs`

Returns all login/logout audit logs.  
⚠️ For development use only.

---

## 👤 Default Users

| ID | Email               | Password | Role        |
|----|---------------------|----------|-------------|
| 1  | superadmin@test.com | test     | superadmin  |
| 2  | admin1@test.com     | test     | admin       |
| 3  | admin2@test.com     | test     | admin       |
| 4  | editor@test.com     | test     | editor      |

---

## 🔐 Technical Details

- Sessions managed with `Map()` (no persistence).
- UUID v4 tokens.
- HTTP Only cookies for better security.
- Middleware for parsing `body` and `cookies`.

---

## 🛠️ Stack

- Node.js + Express
- UUID for tokens
- `body-parser` and `cookie-parser`

---

## ⚠️ Warning

This API **must not be used in production**. It does not hash passwords or implement protection against common attacks (CSRF, Brute Force, etc). For testing or quick integration in local projects
