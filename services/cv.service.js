import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017'
//const client = new MongoClient('mongodb://127.0.0.1:27017')
const client = new MongoClient(uri)
const db = client.db('DB_JS')
const cvDownloads = db.collection('CVDownloads')

async function registerDownload({ role, lang })
{
    await client.connect()

    return cvDownloads.insertOne({
        role,
        lang,
        created_at: new Date()
    })
}

async function getTotals()
{
    await client.connect()

    const total = await cvDownloads.countDocuments()

    const byRole = await cvDownloads.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } }
    ]).toArray()

    const byLang = await cvDownloads.aggregate([
        { $group: { _id: "$lang", count: { $sum: 1 } } }
    ]).toArray()

    const monthly = await cvDownloads.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$created_at" },
                    month: { $month: "$created_at" }
                },
                total: { $sum: 1 }
            }
        },
        { $sort: { "_id.year": -1, "_id.month": -1 } },
        { $limit: 2 }
    ]).toArray()

    const currentMonth = monthly[0]?.total || 0
    const previousMonth = monthly[1]?.total || 0

    let percentChange = null
    if(previousMonth > 0){
        percentChange = Math.round(
            ((currentMonth - previousMonth) / previousMonth) * 100
        )
    }

    return{
        total,
        byRole,
        byLang,
        monthly: {
            current: currentMonth,
            previous: previousMonth,
            percent: percentChange
        }
    }
}

async function getDownloadStats()
{
    await client.connect()

    const byRole = await cvDownloads.aggregate([
        {
            $group: {
                _id: "$role",
                value: { $sum: 1 }
            }
        }
    ]).toArray()

    const byLang = await cvDownloads.aggregate([
        {
            $group: {
                _id: "$lang",
                value: { $sum: 1 }
            }
        }
    ]).toArray()

    return{
        byRole,
        byLang
    }
}

async function getDownloadsByRoleAndLang()
{
    await client.connect()

    const result = await cvDownloads.aggregate([
        {
            $group: {
                _id: {
                    role: "$role",
                    lang: "$lang"
                },
                total: { $sum: 1 }
            }
        },
        {
            $group: {
                _id: "$_id.role",
                langs: {
                    $push: {
                        lang: "$_id.lang",
                        total: "$total"
                    }
                }
            }
        }
    ]).toArray()

    return result.map(item => {
        const data = { role: item._id, es: 0, en: 0 }

        item.langs.forEach(l => {
            data[l.lang] = l.total
        })

        return data
    })
}

export{
    registerDownload,
    getTotals,
    getDownloadStats,
    getDownloadsByRoleAndLang
}