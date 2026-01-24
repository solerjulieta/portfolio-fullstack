import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db('DB_JS')
const education = db.collection('Education')
const status = db.collection('Status')

async function getAll()
{
    await client.connect()

    const educationList = await education.find().sort({ start: -1 }).toArray()

    const statusIds = []
    const categoryIds = []
    const skillIds = []

    educationList.forEach(studie => {
        if(studie.status){
            statusIds.push(studie.status)
        }
        if(studie.category){
            categoryIds.push(studie.category)
        }
        if(Array.isArray(studie.skills)){
            skillIds.push(...studie.skills)
        }
    })

    const statuses = statusIds.length
    ? await db.collection('Status')
        .find({ _id: { $in: statusIds } })
        .toArray()
    : []

    const categories = categoryIds.length
    ? await db.collection('EducationCategories')
        .find({ _id: { $in: categoryIds } })
        .toArray()
    : []

    const skills = skillIds.length
    ? await db.collection("Skills")
        .find({ _id: { $in: skillIds } })
        .toArray()
    : []

    const statusMap = Object.fromEntries(
        statuses.map(s => [s._id.toString(), s])
    )

    const categoryMap = Object.fromEntries(
        categories.map(c => [c._id.toString(), c])
    )

    const skillsMap = Object.fromEntries(
        skills.map(sk => [sk._id.toString(), sk])
    )

    /*
    const statusIds = educationList
        .map(p => p.status)
        .filter(Boolean)

    const status = await db.collection('Status')
    .find({ _id: { $in: statusIds } })
    .toArray()

    const statusMap = Object.fromEntries(
        status.map(s => [s._id.toString(), s])
    )*/

    return educationList.map(studie => ({
        ...studie,
        status: statusMap[studie.status?.toString()] || null,
        category: categoryMap[studie.category?.toString()] || null,
        skills: Array.isArray(studie.skills)
        ? studie.skills
            .map(id => skillsMap[id.toString()])
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
    
    const result = await education.aggregate([
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

    const studie = await education.findOne({ _id: new ObjectId(id)})

    if(!studie){
        throw new Error('No existe un curso/carrera con este ID.')
    }

    return studie
}

async function create(formation)
{
    await client.connect()

    const newFormation = { 
        ...formation,
        status: new ObjectId(formation.status),
        category: new ObjectId(formation.category),
        skills: formation.skills?.map(id => new ObjectId(id)) ?? [],
        created_at: new Date(),
        updated_at: new Date()
    }

    return await education.insertOne(newFormation)
}

async function edit(id, formation)
{
    await client.connect()

    const formationExist = await education.findOne({ _id: new ObjectId(id) })

    if(!formationExist){
        throw new Error('No existe un curso/carrera con este ID.')
    }

    const updateData = {
        updated_at: new Date()
    }

    if(formation.status){
        updateData.status = new ObjectId(formation.status)
    }

    if(formation.category){
        updateData.category = new ObjectId(formation.category)
    }

    if(Array.isArray(formation.skills)){
        updateData.skills = formation.skills.map(id => new ObjectId(id))
    }

    if (formation.title) updateData.title = formation.title
    if (formation.institution) updateData.institution = formation.institution
    if (formation.mode) updateData.mode = formation.mode
    if (formation.start) updateData.start = formation.start
    if (formation.end) updateData.end = formation.end

    return await education.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    )
}

async function archive(id)
{
    await client.connect()

    const archivedStatus = await status.findOne({ key: "ARCHIVED" })

    if(!archivedStatus){
        throw new Error("No existe el estado ARCHIVADO en la base de datos.")
    }

    const formationExist = await education.findOne({ _id: new ObjectId(id) })
    if(!formationExist){
       throw new Error("No existe una formación con este ID.") 
    }

    await education.updateOne(
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

    const formationExist = await education.findOne({ _id: new ObjectId(id) })
    if(!formationExist){
       throw new Error("No existe una formación con este ID.") 
    }

    await education.updateOne(
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

async function deleteEducation(id)
{
    await client.connect()

    const formationExist = await education.findOne({ _id: new ObjectId(id) })
    
    if(!formationExist){
       throw new Error("No existe un proyecto con este ID.") 
    }

    await education.deleteOne({ _id: new ObjectId(id) })

    return true
}

export{
    getAll,
    getTotal,
    getById,
    create,
    edit,
    archive,
    restore,
    deleteEducation
}