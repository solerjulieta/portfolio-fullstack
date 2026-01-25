import { MongoClient, ObjectId } from 'mongodb'
import fs from 'fs'
import path from 'path'

const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017'
//const client = new MongoClient('mongodb://127.0.0.1:27017')
const client = new MongoClient(uri)
const db = client.db('DB_JS')
const projects = db.collection('Projects')
const status = db.collection('Status')

async function getAll()
{
    await client.connect()

    const projectsList = await projects.find().toArray()

    const statusIds = []
    const categoryIds = []
    const techIds = []

    projectsList.forEach(project => {
        if(project.status){
            statusIds.push(project.status)
        }

        if(project.category){
            categoryIds.push(project.category)
        }

        if(Array.isArray(project.tech)){
            techIds.push(...project.tech)
        }
    })

    const statuses = statusIds.length
    ? await db.collection('Status')
        .find({ _id: { $in: statusIds } })
        .toArray()
    : []

    const categories = categoryIds.length
    ? await db.collection('ProjectCategories')
        .find({ _id: { $in: categoryIds } })
        .toArray()
    : []

    const techs = techIds.length
    ? await db.collection('Technologies')
        .find({ _id: { $in: techIds } })
        .toArray()
    : []

    const statusMap = Object.fromEntries(
        statuses.map(s => [s._id.toString(), s])
    )

    const categoryMap = Object.fromEntries(
        categories.map(c => [c._id.toString(), c])
    )

    const techMap = Object.fromEntries(
        techs.map(t => [t._id.toString(), t])
    )

    /*
    const statusIds = projectsList
        .map(p => p.status)
        .filter(Boolean)
    
    const statuses = await db.collection('Status')
        .find({ _id: { $in: statusIds } })
        .toArray()

    const statusMap = Object.fromEntries(
        statuses.map(s => [s._id.toString(), s])
    )*/

    return projectsList.map(project => ({
        ...project,
        status: statusMap[project.status?.toString()] || null,
        category: categoryMap[project.category?.toString()] || null,
        tech: Array.isArray(project.tech)
        ? project.tech
            .map(id => techMap[id.toString()])
            .filter(Boolean)
        : []
    }))
}

async function getTotal()
{
    await client.connect()

    const statuses = await status.find({ key: { $in: [ "PUBLISHED", "ARCHIVED" ] } }).toArray()

    const statusMap = Object.fromEntries(
        statuses.map(s => [s.key, s._id])
    )
    
    const result = await projects.aggregate([
        {
            $match: {
                status: { $in: Object.values(statusMap) }
            }
        },
        {
            $group: {
                _id: "$status",
                total: { $sum: 1 }
            }
        }
    ]).toArray()

    const totals = {
        published: 0,
        archived: 0
    }

    result.forEach(item => {
        if (item._id.equals(statusMap.PUBLISHED)) {
            totals.published = item.total
        }

        if (item._id.equals(statusMap.ARCHIVED)) {
            totals.archived = item.total
        }
    })

    return totals
}

async function getById(id)
{
    await client.connect()

    const project = await projects.findOne({ _id: new ObjectId(id) })

    if(!project){
        throw new Error('No existe un proyecto con este ID.')
    }

    return project
}

async function create(project)
{
    await client.connect()

    const existingProject = await projects.findOne({
        'title': project.title
    })

    if(existingProject){
        throw new Error('Ya existe un proyecto con ese título.')
    }

    const newProject = {
        ...project,
        status: new ObjectId(project.status),
        category: new ObjectId(project.category),
        tech: project.tech?.map(id => new ObjectId(id)) ?? [],
        created_at: new Date(),
        updated_at: new Date()
    }

    const result = await projects.insertOne(newProject)

    return{
        _id: result.insertedId,
        ...newProject
    }
}

async function edit(id, project)
{
    await client.connect()

    const projectExist = await projects.findOne({ _id: new ObjectId(id) })

    if(!projectExist){
        throw new Error('No existe un proyecto con este ID.')
    }

    const updateData = {
        updated_at: new Date()
    }

    if(project.status){
        updateData.status = new ObjectId(project.status)
    }

    if(project.category){
        updateData.category = new ObjectId(project.category)
    }

    if(Array.isArray(project.tech)){
        updateData.tech = project.tech.map(id => new ObjectId(id))
    }

    if(project.title) updateData.title = project.title 
    if(project.description) updateData.description = project.description
    if(project.demo_link) updateData.demo_link = project.demo_link
    if(project.github_link) updateData.github_link = project.github_link

    if (project.img) {
        // si había una imagen anterior, eliminarla
        if (projectExist.img) {
            const oldPath = path.join('public', 'img', 'projects', projectExist.img)
            if (fs.existsSync(oldPath)) {
                await fs.promises.unlink(oldPath)
                console.log("🗑️ Imagen previa reemplazada:", projectExist.img)
            }
        }

        updateData.img = project.img  // ✔️ esto es lo correcto
    }

    return await projects.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    )
}

async function deleteImg(id)
{
    await client.connect()

    const project = await projects.findOne({ _id: new ObjectId(id) })
    if(!project) throw new Error('Proyecto no encontrado.')

    if(!project.img) throw new Error('El proyecto no tiene una imagen asignada.')
    
    const imagePath = path.join('public', 'img', 'projects', project.img)

    //Borrar archivo fisico si existe
    if(fs.existsSync(imagePath)){
        fs.unlinkSync(imagePath)
    }

    await projects.updateOne(
        { _id: new ObjectId(id) },
        { $set: { img: null, updated_at: new Date() } }
    )

    return true
}

async function archive(id)
{
    await client.connect()

    const archivedStatus = await status.findOne({ key: "ARCHIVED" })

    if(!archivedStatus){
        throw new Error("No existe el estado ARCHIVADO en la base de datos.")
    }

    const projectExist = await projects.findOne({ _id: new ObjectId(id) })
    if(!projectExist){
       throw new Error("No existe un proyecto con este ID.") 
    }

    await projects.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                status: new ObjectId(archivedStatus._id),
                updated_at: new Date()
            }
        }
    )

    return true
}

async function restore(id)
{
    await client.connect()

    const restoredStatus = await status.findOne({ key: "REVIEW" })

    if(!restoredStatus){
        throw new Error("No existe el estado REVISIÓN en la base de datos.")
    }

    const projectExist = await projects.findOne({ _id: new ObjectId(id) })
    if(!projectExist){
       throw new Error("No existe un proyecto con este ID.") 
    }

    await projects.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                status: new ObjectId(restoredStatus._id),
                updated_at: new Date()
            }
        }
    )

    return true
}

async function deleteProject(id)
{
    await client.connect()

    const projectExist = await projects.findOne({ _id: new ObjectId(id) })
    if(!projectExist){
       throw new Error("No existe un proyecto con este ID.") 
    }

    if(projectExist.img){
        const imagePath = path.join('public', 'img', 'projects', projectExist.img)

        if(fs.existsSync(imagePath)){
            try{
                fs.unlinkSync(imagePath)
            } catch(err){
                console.log("Error al querer eliminar la imagen", err)
            }
        }
    }

    await projects.deleteOne({ _id: new ObjectId(id) })

    return true
}

export{
    getAll,
    getTotal,
    getById,
    create,
    edit,
    deleteImg,
    archive,
    restore,
    deleteProject
}