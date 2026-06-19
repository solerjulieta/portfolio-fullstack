# Portfolio - Julieta Natalí Soler
Versión en español más abajo / Spanish version below

## About
This is my personal portfolio, built to showcase who I am, my education, and my projects. It includes a public-facing site with a contact form, plus a private admin panel (for my own use only) to manage projects and courses, and a dashboard with usage analytics. 

## Features

Public site

- About me section
- Education / studies timeline
- Projects showcase
- Contact form with emails notifications
- CV download (multi-language)
- Multi-language support (i18next)

Admin panel (private, owner-only access)

- Secure login (JWT-based authentication)
- Full CRUD for projects (create, edit, delete)
- Full CRUD fro courses/certifications (create, edit, delete)
- Image upload and optimization for project covers

Analytics dashboard (private)

- Most visited projects
- Total CV downloads
- CV downloads broken down by language
- Visual charts and metrics overview

## Tech Stack

Frontend

Category             | Technology

Framework            | React 19 + Vite
Routing              | React Router v7
Styling              | Tailwind CSS
UI Components        | PrimeReact, Headless UI, Lucide Icons, React Icons
Animations           | Framer Motion, Three.js, Vanta.js
Forms & Validation   | React Hook Form, Yup
Internationalization | i18next, react-i18next
Charts               | Recharts
Notifications        | React Hot Toast
Markdown rendering   | React Markdown

Backend

Category       | Technology

Runtime        | Node.js
Framework      | Express 5
Database       | MongoDB (native driver)
Authentication | JWT (jsonwebtoken) + bcryptjs
File uploads   | Multer + Sharp (image processing)
Email          | Nodemailer / Resend
Validation     | Yup (schemas live in /schemas)
Templating     | EJS (e.g. email templates)
Dev tooling    | Nodemon

## Project Structure (high level)

/soler-julieta    -> Fontend: React + Vite app (public site + admin panel)
/                 -> Express API + MongoDB
  /api
    /routes       -> API endpoints (projects, courses, auth, contact, analytics)
    /controllers  -> Request handling, calls services
  /services       -> Business logic + MongoDB communication (create/edit/delete/query), including the MongoDB client/connection itself
  /middlewares    -> JWT auth guard, error handling, upload handling
  /schemas        -> Yup validation schemas
  /templates      -> Email templates
  /utils          -> Shared helpers (e.g. auth.utils.js - identifies if a login identifier is an email or a username)

## Getting Started

Prerequisites

- Node.js 18+
- A MongoDB instance (local or Atlas)

1. Clone the repository

git clone <repo-url>

2. Install dependecies

Frontend

cd soler-julieta
npm install

Backend

cd ..
npm install

3. Enviroment variables

Create a .env file inside /:
MONGO_URL=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
GMAIL_USER=your_sender_email@example.com
GMAIL_APP_PASS=your_gmail_password
MY_WORK_EMAIL=your_sender_email@example.com

The app connects to a database named DB_JS by default (harcoded in the services layer). Adjust this in the code if you want it to come from an enviroment variable instead.

If using Nodemailer instead of Resend, add SMTP credentials as needed (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS).

4. Run in development 

Frontend 

cd soler-julieta
npm run dev

Backend 

cd ..
npm run dev

5. Build for production

cd soler-julieta
npm rund build

## Deployment

- Frontend: deployed on Vercel
- Backend: deployed on Render

## Admin Access

The admin panel and dashboard are private and intended for personal use only - there is no public sign-up. Acess is restricted via JWT-protected routes.

## Contact

Feel free to reach through the contact form on the live site, or connect with me on:

- LinkedIn: https://www.linkedin.com/in/julieta-soler/
- GitHub: https://github.com/solerjulieta

_____________________________________

es Español

# Sobre el proyecto

Este es mi portfolio personal, desarrollado para mostrar quién soy, mi formación académica y mis proyectos. Incluye un sitio público con formulario de contacto, además de un panel de administración privado (de uso exclusivo personal) para gestionar proyectos y cursos, junto con un dashboard de analíticas de uso.

## Funcionalidades

Sitio público

- Sección "Sobre mí"
- Línea de tiempo de estudios/formación
- Galería de proyectos
- Formulario de contacto con notificaciones por email
- Descarga de CV (en inglés o español)
- Soporte multilenguaje (i18next)

Panel de administración (privado, acceso solo para mí)

- Login seguro (autenticación con JWT)
- Flujo de recuperación de contraseña (token seguro enviado por email, expiera en 1 hora)
- CRUD completo de proyectos (crear, editar, eliminar)
- CRUD completo de cursos/certificacions (crear, editar, eliminar)
- Carga y optimización de imágenes para las portadas de proyectos

Dashboard de analíticas (privado)

- Proyectos más visitados
- Total de CVs descargados
- Descargas de CV agrupadas por idioma
- Gráficos y métricas visuales

## Stack Tecnológico

Frontend

Categoría                  | Tecnología

Framework                  | React 19 + Vite
Routing                    | React Router v7
Estilos                    | Tailwind CSS
Componentes UI             | PrimeReact, Headless UI, Lucide Icons, React Icons
Animaciones                | Framer Motion, Three.js, Vanta.js
Formularios y validación   | React Hook Form, Yup
Internacionalización       | i18next, react-i18next
Gráficos                   | Recharts
Notificaciones             | React Hot Toast
Renderizado de Markdown    | React Markdown

Backend

Categoría                  | Tecnología

Entorno                    | Node.js
Framework                  | Express 5
Base de datos              | MongoDB (native driver)
Autenticación | JWT (jsonwebtoken) + bcryptjs
Subida de archivos         | Multer + Sharp (image processing)
Email                      | Nodemailer / Resend
Validación                 | Yup (schemas live in /schemas)
Plantillas                 | EJS (e.g. email templates)
Herramientas de desarrollo | Nodemon

## Estructura del proyecto (general)

/soler-julieta    -> React + Vite app (sitio público + panel admin)
/                 -> API de Express + MongoDB
  /api
    /routes       -> Endpoints de la API (proyectos, cursos, auth, contacto, analíticas)
    /controllers  -> Manejo de requests, invoca a los services
    
  /services       -> Business logic + MongoDB communication (create/edit/delete/query), including the MongoDB client/connection itself
  /middlewares    -> JWT auth guard, error handling, upload handling
  /schemas        -> Yup validation schemas
  /templates      -> Email templates
  /utils          -> Shared helpers (e.g. auth.utils.js - identifies if a login identifier is an email or a username)

## Cómo correrlo localmente

Requisitos previos

- Node.js 18+
- Una instancia de MongoDB (local o Atlas)

1. Clonar el repositorio

git clone <repo-url>

2. Installar dependencias

Frontend: 

cd soler-julieta
npm install

Backend: 

cd ..
npm install

3. Variables de entorno

Crear un archivo .env dentro del backend

MONGO_URL=tu_string_de_conexión_a_mongodb
SECRET_KEY=tu_secreto_jwt
GMAIL_USER=tu_email_remitente@example.com
GMAIL_APP_PASS=tu_contraseña_gmail
MY_WORK_EMAIL=tu_email_remitente@example.com

Si usás Nodemails en lugar de Resend, agregá las credenciales SMTP necesarias (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS).

4. Correr en modo desarrollo

Frontend:

cd soler-julieta
npm run dev

Backend:

cd ..
npm run dev

5. Build de producción

cd soler-julieta
npm run build

## Deploy

- Frontend: deployado en Vercel
- Backend: deployado en Render

## Acceso al panel de administración

El panel de administración y el dashboard son privados y de uso exclusivamente personal: no hay registro público. El acceso está protegido mediante rutas validadas con JWT.

## Contacto

Podés escribir a través dle formulario de contacto del sitio, o conectar conmigo en:

- LinkedIn: https://www.linkedin.com/in/julieta-soler/
- GitHub: https://github.com/solerjulieta

