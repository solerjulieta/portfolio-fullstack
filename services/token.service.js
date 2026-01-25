import jwt from 'jsonwebtoken'
import { MongoClient, ObjectId } from 'mongodb'

const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017'
//const client = new MongoClient('mongodb://127.0.0.1:27017')
const client = new MongoClient(uri)
const db = client.db('DB_JS')
const tokens = db.collection("Tokens")

async function create(account)
{
    const secretKey = process.env.SECRET_KEY
    const token = jwt.sign(account, secretKey)

    await client.connect()

    await tokens.insertOne({ token, account_id: new ObjectId(account._id) })

    return token
}

async function verify(token)
{
    try{
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        const existingToken = await tokens.findOne({
            token,
            account_id: new ObjectId(payload._id)
        })
        if(!existingToken) return null
        return payload
    } catch (error) {
        return null
    }
}

async function remove(token)
{
    await client.connect()
    await tokens.deleteOne({ token })
}

export {
    create,
    verify,
    remove
}