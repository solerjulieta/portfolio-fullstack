import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db('DB_JS')
const projectCategories = db.collection("ProjectCategories")

async function getAll()
{
    await client.connect()
    return projectCategories.find().toArray()
}

export{
    getAll
}