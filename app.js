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
app.use(cookieParser())

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true) 
        
        const isAllowed = origin === 'https://julieta-soler.vercel.app' || 
                          /\.vercel\.app$/.test(origin) || 
                          /localhost:/.test(origin)
        
        if (isAllowed) {
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'auth_token'],
    credentials: true
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', ProjectsApiRoute)
app.use('/api', EducationApiRoute)
app.use('/api', AdminApiRoute)
app.use('/api', SkillsApiRoute)
app.use('/api', ContactApiRoute)
app.use('/api', EducationCategoriesApiRoute)
app.use('/api', ProjectCategoriesApiRoute)
app.use('/api', StatusApiRoute)
app.use('/api', TechnologiesApiRoute)
app.use('/api', CVApiRoute)
app.use('/api', ProjectEventsApiRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`El servidor se está ejecutando - http://localhost:${PORT}`)
})