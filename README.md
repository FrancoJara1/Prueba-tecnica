# Article Manager API

API REST para la gestión de artículos. Permite a usuarios autenticarse y administrar artículos propios mediante operaciones CRUD.

El proyecto implementa autenticación, validación de datos, búsqueda, paginación y ordenamiento utilizando una arquitectura modular.

---

## 🚀 Tecnologías

* **Node.js**
* **TypeScript**
* **Hono** (Framework HTTP)
* **MongoDB Driver**
* **MongoDB Atlas**
* **Better Auth** (Autenticación)
* **Zod** (Validaciones)

---

## 📁 Arquitectura

```
src/
├── config/          # Configuración de la aplicación
├── controllers/     # Lógica de negocio
├── database/        # Conexión MongoDB
├── middleware/      # Middlewares (auth)
├── routers/         # Definición de endpoints
├── schemas/         # Validaciones con Zod
├── types/           # Tipos TypeScript
└── utils/           # Utilidades
```

---

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone <repository-url>
```

Instalar dependencias:

```bash
npm install
```

Crear archivo `.env`:

```env
PORT=3000

MONGODB_URI=mongodb+srv://...

BETTER_AUTH_SECRET=secret

BETTER_AUTH_URL=http://localhost:3000
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Servidor disponible en:

```
http://localhost:3000
```

---

# 🔐 Autenticación

La API utiliza Better Auth para manejar usuarios y sesiones.

## Registro

```
POST /api/auth/sign-up/email
```

Body:

```json
{
  "name": "Usuario",
  "email": "usuario@test.com",
  "password": "password123"
}
```

---

## Login

```
POST /api/auth/sign-in/email
```

Body:

```json
{
  "email": "usuario@test.com",
  "password": "password123"
}
```

Las rutas protegidas requieren:

```
Authorization: Bearer TOKEN
```

---

# 📝 Articles API

## Crear artículo

```
POST /articles
```

Requiere autenticación.

Body:

```json
{
  "title": "Nuevo artículo",
  "content": "Contenido del artículo"
}
```

---

## Listar artículos

```
GET /articles
```

Parámetros opcionales:

| Parámetro | Descripción                   |
| --------- | ----------------------------- |
| page      | Página actual                 |
| limit     | Cantidad de resultados        |
| search    | Buscar por título o contenido |
| sortBy    | Campo de ordenamiento         |
| order     | asc / desc                    |

Ejemplo:

```
GET /articles?page=1&limit=10&search=node&sortBy=createdAt&order=desc
```

---

## Obtener artículo

```
GET /articles/:id
```

---

## Actualizar artículo

```
PUT /articles/:id
```

Requiere autenticación.

Solo el propietario puede modificarlo.

---

## Eliminar artículo

```
DELETE /articles/:id
```

Requiere autenticación.

Solo el propietario puede eliminarlo.

---

# ✅ Características implementadas

* Registro e inicio de sesión de usuarios.
* Gestión de sesiones con Better Auth.
* CRUD completo de artículos.
* Protección de rutas privadas.
* Control de permisos por propietario.
* Validación de datos con Zod.
* Búsqueda por título y contenido.
* Paginación.
* Ordenamiento dinámico.
* Índices MongoDB para optimización.

---

## 🧪 Pruebas

La API puede probarse utilizando Postman.

Flujo recomendado:

1. Registrar usuario.
2. Iniciar sesión.
3. Copiar token.
4. Crear artículos.
5. Consultar, editar y eliminar artículos.

---



