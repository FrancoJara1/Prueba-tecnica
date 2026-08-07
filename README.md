# Prueba-tecnica

Desarrollo pagina web para prueba tecnica for Wortise
Article Manager API

API REST para la gestión de artículos desarrollada con Node.js, TypeScript, Hono y MongoDB.

El proyecto permite registrar usuarios, autenticarse mediante Better Auth y gestionar artículos con operaciones CRUD, validaciones, búsqueda, paginación y ordenamiento.

Tecnologías utilizadas
Node.js
TypeScript
Hono
MongoDB Driver
MongoDB Atlas
Better Auth
Zod
Postman
Instalación

Clonar el repositorio:

git clone <URL_DEL_REPOSITORIO>

Ingresar al proyecto:

cd backend

Instalar dependencias:

npm install
Variables de entorno

Crear un archivo .env en la raíz del backend:

PORT=3000

MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/article-manager

BETTER_AUTH_SECRET=secret_key

BETTER_AUTH_URL=http://localhost:3000
Ejecutar el proyecto

Modo desarrollo:

npm run dev

El servidor iniciará en:

http://localhost:3000

Respuesta de prueba:

{
"message": "API funcionando 🚀"
}
Autenticación

La autenticación se realiza mediante Better Auth.

Registro
POST
/api/auth/sign-up/email

Body:

{
"name": "Franco",
"email": "franco@test.com",
"password": "password123"
}
Login
POST
/api/auth/sign-in/email

Body:

{
"email": "franco@test.com",
"password": "password123"
}

Respuesta:

{
"token": "TOKEN",
"user": {
"id": "USER_ID",
"name": "Franco",
"email": "franco@test.com"
}
}

El token debe enviarse en las rutas protegidas:

Authorization: Bearer TOKEN
Articles API
Crear artículo
POST
/articles

Headers:

Authorization: Bearer TOKEN
Content-Type: application/json

Body:

{
"title": "Mi primer artículo",
"content": "Contenido del artículo"
}

Respuesta:

{
"id": "ARTICLE_ID",
"title": "Mi primer artículo",
"content": "Contenido del artículo"
}
Obtener artículos
GET
/articles

Soporta:

búsqueda
paginación
ordenamiento

Ejemplo:

/articles?page=1&limit=10&search=node&sortBy=createdAt&order=desc

Parámetros:

Parámetro Descripción
page Número de página
limit Cantidad de resultados
search Busca por título y contenido
sortBy Campo para ordenar
order asc o desc

Respuesta:

{
"page": 1,
"limit": 10,
"total": 20,
"totalPages": 2,
"data": []
}
Obtener artículo por ID
GET
/articles/:id

Ejemplo:

/articles/64abc123
Actualizar artículo
PUT
/articles/:id

Requiere autenticación.

Headers:

Authorization: Bearer TOKEN

Body:

{
"title": "Nuevo título",
"content": "Nuevo contenido"
}

Solo el usuario propietario puede modificar el artículo.

Eliminar artículo
DELETE
/articles/:id

Requiere autenticación.

Solo el propietario del artículo puede eliminarlo.

Validaciones

Las entradas son validadas mediante Zod.

Ejemplos:

El título debe tener una longitud mínima.
El contenido es obligatorio.
No se permiten campos no definidos en las actualizaciones.
Arquitectura
src
│
├── config
│ └── Configuración de la aplicación
│
├── controllers
│ └── Lógica de negocio
│
├── database
│ └── Conexión MongoDB
│
├── middleware
│ └── Autenticación y validaciones
│
├── routers
│ └── Definición de endpoints
│
├── schemas
│ └── Validaciones con Zod
│
├── types
│ └── Tipos TypeScript
│
└── utils
└── Funciones reutilizables
Seguridad implementada
Autenticación mediante Better Auth.
Protección de rutas privadas.
Validación de datos con Zod.
Control de permisos por propietario.
Validación de IDs de MongoDB.
