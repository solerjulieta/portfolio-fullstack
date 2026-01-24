import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db('DB_JS')
const skills = db.collection("Skills")

async function getAll()
{
    await client.connect()
    return skills.find().toArray()
}

async function getByCategory(category)
{
    await client.connect()
    return skills.find({ categories: { $regex: new RegExp(category, 'i') } }).toArray()
}

export{
    getAll,
    getByCategory
}