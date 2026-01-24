import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import ProjectsApiRoute from './api/routes/projects.api.route.js'
import EducationApiRoute from './api/routes/education.api.route.js'
import AdminApiRoute from './api/routes/admin.api.route.js'
import SkillsApiRoute from './api/routes/skills.api.route.js'
import ContactApiRoute from './api/routes/contact.api.route.js'
import EducationCategoriesApiRoute from './api/routes/educationCategories.api.route.js'
import ProjectCategoriesApiRoute from './api/routes/projectCategories.api.routes.js'
import StatusApiRoute from './api/routes/status.api.route.js'
import TechnologiesApiRoute from './api/routes/technologies.api.route.js'
import CVApiRoute from './api/routes/cv.api.route.js'
import ProjectEventsApiRoute from './api/routes/projectEvents.api.route.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.set('view engine', 'ejs') //Le decimos al servidor que vamos a usar EJS como motor de plantillas

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', ProjectsApiRoute)
app.use('/', EducationApiRoute)
app.use('/', AdminApiRoute)
app.use('/', SkillsApiRoute)
app.use('/', ContactApiRoute)
app.use('/', EducationCategoriesApiRoute)
app.use('/', ProjectCategoriesApiRoute)
app.use('/', StatusApiRoute)
app.use('/', TechnologiesApiRoute)
app.use('/', CVApiRoute)
app.use('/', ProjectEventsApiRoute)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`El servidor se está ejecutando - http://localhost:${PORT}`)
})