import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017'
//const client = new MongoClient('mongodb://127.0.0.1:27017')
const client = new MongoClient(uri)
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