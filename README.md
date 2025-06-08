# 🛡️ Mock Auth API

API de autenticación **falsa** para entornos de desarrollo y pruebas. Ideal para integraciones rápidas con frontends o microservicios que requieran login/logout/verify sin necesidad de implementar un sistema real.

## 🚀 Características

- **Login y Logout** con cookies o token Bearer.
- **Verificación de sesión** (`/auth/verify`).
- **Listado de usuarios** sin contraseñas.
- **Logs de auditoría** por cada login/logout.
- **Sesiones en memoria** (Map).

## 📦 Instalación

```bash
git clone https://github.com/tu-usuario/mock-auth
cd mock-auth
npm install
```

## ▶️ Uso

```bash
npm start
```

Por defecto escucha en `http://localhost:4000`.

## 📚 Endpoints disponibles

### `GET /auth/users`
Devuelve todos los usuarios disponibles **sin** contraseñas.  
_💡 Útil para ver los usuarios disponibles para testear._

---

### `POST /auth/login`

**Body:**
```json
{
  "email": "superadmin@test.com",
  "password": "test"
}
```

**Respuesta:**
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

> 📝 Establece también una cookie `sessionToken`.

---

### `POST /auth/logout`

Cierra la sesión actual y elimina el token.

- Soporta:
  - Header: `Authorization: Bearer <token>`
  - Cookie: `sessionToken`

---

### `POST /auth/verify`

Verifica si una sesión es válida.

- Soporta:
  - Header: `Authorization: Bearer <token>`
  - Cookie: `sessionToken`

**Respuesta si es válida:**
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

Devuelve todos los registros de login/logout.  
⚠️ Solo para uso en desarrollo.

---

## 👤 Usuarios por defecto

| ID | Email               | Contraseña | Rol         |
|----|---------------------|------------|--------------|
| 1  | superadmin@test.com | test       | superadmin   |
| 2  | admin1@test.com     | test       | admin        |
| 3  | admin2@test.com     | test       | admin        |
| 4  | editor@test.com     | test       | editor       |

---

## 🔐 Detalles técnicos

- Sesiones gestionadas con `Map()` (sin persistencia).
- Tokens UUID v4.
- Cookies HTTP Only para mayor seguridad.
- Middleware para parsear `body` y `cookies`.

---

## 🛠️ Stack

- Node.js + Express
- UUID para tokens
- `body-parser` y `cookie-parser`

---

## ⚠️ Advertencia

Esta API **no debe usarse en producción**. No cifra contraseñas ni implementa protección contra ataques comunes (CSRF, Brute Force, etc). Solo para propósitos de testing o integración rápida en proyectos locales o PoCs.
