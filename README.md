# Article Manager API

API REST para la gestión de artículos. Permite a usuarios autenticarse y administrar artículos propios mediante operaciones CRUD.

El proyecto implementa autenticación, validación de datos, búsqueda, paginación y ordenamiento utilizando una arquitectura modular.

---

## 🚀 Tecnologías

## Backend

- **Node.js**
- **TypeScript**
- **Hono** (Framework HTTP)
- **MongoDB Driver**
- **MongoDB Atlas**
- **Better Auth** (Autenticación)
- **Zod** (Validaciones)

## Frontend

- **React**
- **TypeScript**
- **Vite**
- **TanStack Form** (gestión de formularios)
- **TanStack Query** (manejo de datos y comunicación con la API)
- **TanStack Router** (routing y navegación)
- **Axios** (peticiones HTTP)
- **HeroUI** (componentes de interfaz)
- **Zod** (validación de datos)

---

## 📁 Arquitectura del Backend

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

## 📁 Arquitectura del Frontend

````
src/
├── assets/      # Imágenes, iconos y otros recursos
├── components/  # Componentes reutilizables de la interfaz
├── hooks/       # Custom hooks para lógica reutilizable
├── lib/         # Configuraciones y utilidades de librerías
├── pages/       # Páginas principales de la aplicación
├── routes/      # Configuración y definición de rutas
├── schemas/     # Schemas de validación con Zod
├── services/    # Servicios y llamadas a la API
---

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone <repository-url>
````

Instalar dependencias tanto en backend como en frontend:

```bash
npm install
```

Crear archivo `.env` para backend:

```env
PORT=3000

MONGODB_URI=mongodb://...

BETTER_AUTH_SECRET=secret

BETTER_AUTH_URL=http://localhost:3000
```

> ⚠️ **Nota sobre MongoDB:** cada persona que clone este proyecto debe crear su propio clúster en [MongoDB Atlas](https://www.mongodb.com/atlas) y usar su propia `MONGODB_URI` en su `.env` local.

Crear archivo `.env` para frontend:

```env
VITE_API_URL=http://localhost:3000
```

Ejecutar en desarrollo (backend y frontend):

```bash
npm run dev
```

Servidor disponible en:

```
http://localhost:3000
```

---

## 🌱 Datos de ejemplo (seed)

El proyecto incluye un script de seed para cargar datos de ejemplo en la base (usuarios y artículos), útil para probar la API sin tener que cargar todo a mano.

Ejecutar desde el backend:

```bash
npm run seed
```

> Asegurate de tener `MONGODB_URI` configurado en tu `.env` antes de correrlo, ya que el seed se conecta a tu clúster para insertar los datos.

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

## Listar artículos personales

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

## Buscar artículos en la pagina principal

```
GET /public/articles?search=mongo&page=1&limit=9

No se requiere autenticación.
```

---

## Buscar autores en la pagina principal

```
GET /public/authors

No se requiere autenticación.
```

# ✅ Características implementadas

- Registro e inicio de sesión de usuarios.
- Gestión de sesiones con Better Auth.
- CRUD completo de artículos.
- Protección de rutas privadas.
- Control de permisos por propietario.
- Validación de datos con Zod.
- Búsqueda por título y contenido.
- Paginación.
- Ordenamiento dinámico.
- Índices MongoDB para optimización.

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

## 🤖 Uso de herramientas de IA

Durante el desarrollo de la prueba se utilizaron herramientas de inteligencia artificial como apoyo al proceso de desarrollo.

### ChatGPT

Se utilizó como herramienta de asistencia para:

- Recibir orientación sobre la integración de **Hono, Better Auth, Zod y TanStack**.
- Resolver dudas sobre las tecnologías utilizadas en el proyecto.
- Analizar y solucionar errores durante el desarrollo.
- Comprender conceptos y buenas prácticas relacionadas con autenticación, validación, APIs REST y manejo de datos.

### Claude

Se utilizó como herramienta complementaria para:

- Revisar código y detectar posibles errores.
- Analizar decisiones de arquitectura y organización del proyecto.
- Obtener diferentes enfoques para resolver problemas durante el desarrollo.
- Revisar implementaciones y recibir sugerencias de mejora.

Las herramientas de IA fueron utilizadas como apoyo durante el proceso de desarrollo. Las soluciones propuestas fueron analizadas, adaptadas e integradas manualmente en el proyecto, realizando las pruebas necesarias para verificar su correcto funcionamiento.

```

```

```

```
