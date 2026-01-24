import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db('DB_JS')
const projectEvents = db.collection('ProjectEvents')

async function registerProjectEvent({ projectId, projectType, action, lang })
{
    await client.connect()

    return projectEvents.insertOne({
        projectId: new ObjectId(projectId),
        projectType,
        action,
        lang,
        created_at: new Date()
    })
}

async function getMostVisitedProject()
{
    await client.connect()

    const result = await projectEvents.aggregate([
        { $match: { action: "project_view" } },
        {
            $group: {
                _id: "$projectId",
                visits: { $sum: 1 }
            }
        },
        { $sort: { visits: -1 } },
        { $limit: 1 },
        {
            $lookup: {
                from: "Projects",
                localField: "_id",
                foreignField: "_id",
                as: "project"
            }
        },
        { $unwind: "$project" },
        {
            $lookup: {
                from: "ProjectCategories",
                localField: "project.category",
                foreignField: "_id",
                as: "category"
            }
        },
        { $unwind: "$category" },

        // 3️⃣ Opcional: proyectar solo lo necesario
        {
            $project: {
                visits: 1,
                "project._id": 1,
                "project.title": 1,
                "category.en": 1,
                "category.es": 1
            }
        }
    ]).toArray()

    return result[0] || null
}

async function getTopVisitedProjects(limit = 3)
{
    await client.connect()

    const result = await projectEvents.aggregate([
        { $match: { action: "project_view" } },
        {
            $group: {
                _id: "$projectId",
                visits: { $sum: 1 }
            }
        },
        { $sort: { visits: -1 } },
        { $limit: limit },
        {
            $lookup: {
                from: "Projects",
                localField: "_id",
                foreignField: "_id",
                as: "project"
            }
        },
        { $unwind: "$project" },
        {
            $lookup: {
                from: "ProjectCategories",
                localField: "project.category",
                foreignField: "_id",
                as: "category"
            }
        },
        { $unwind: "$category" },
        {
            $project: {
                visits: 1,
                "project._id": 1,
                "project.title": 1,
                "category.es": 1,
                "category.en": 1
            }
        }
    ]).toArray()

    return result
}

export {
    registerProjectEvent,
    getMostVisitedProject,
    getTopVisitedProjects
}