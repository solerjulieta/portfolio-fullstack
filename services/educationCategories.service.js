import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db('DB_JS')
const educationCategories = db.collection("EducationCategories")

async function getAll()
{
    await client.connect()
    return educationCategories.find().toArray()
}

export{
    getAll
}