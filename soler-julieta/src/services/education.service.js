import API from './api.service'

export async function getAll()
{
    return API.call({ uri: 'education' })
}

export async function getStats()
{
    return API.call({ uri: 'education/stats' })
}


export async function getById(id)
{
    return API.call({ uri: `education/${id}` })
}

export async function create(data)
{
    return API.call({ uri: 'education', method: 'POST', body: data })
}

export async function edit(id, data)
{
    return API.call({ uri: `education/${id}`, method: 'PATCH', body: data })
}

export async function archive(id)
{
    return API.call({ uri: `education/${id}/archive`, method: 'PATCH' })
}

export async function restore(id)
{
    return API.call({ uri: `education/${id}/restore`, method: 'PATCH' })
}

export async function deleteFormation(id)
{
    return API.call({ uri: `education/${id}`, method: 'DELETE' })
}

export default{
    getAll,
    getStats,
    getById,
    create,
    edit,
    archive,
    restore,
    delete: deleteFormation
}