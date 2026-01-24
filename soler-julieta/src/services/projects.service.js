import API from './api.service'

export async function getAll()
{
    return API.call({ uri: 'projects' })
}

export async function getStats()
{
    return API.call({ uri: 'projects/stats' })
}

export async function getById(id)
{
    return API.call({ uri: `project/${id}` })
}

export async function create(formData)
{
    return API.call({ uri: 'projects', method: 'POST', body: formData, isMultipart: true })
}

export async function edit(id, formData)
{
    return API.call({ uri: `project/${id}`, method: 'PATCH', body: formData, isMultipart: true })
}

export async function deleteImg(id)
{
    return API.call({ uri: `project/${id}/image`, method: 'DELETE' })
}

export async function archive(id)
{
    return API.call({ uri: `project/${id}/archive`, method: 'PATCH' })
}

export async function restore(id)
{
    return API.call({ uri: `project/${id}/restore`, method: 'PATCH' })
}

export async function deleteProject(id)
{
    return API.call({ uri: `project/${id}`, method: 'DELETE' })
}

export default{
    getAll,
    getStats,
    getById, 
    create,
    edit,
    deleteImg,
    archive,
    restore,
    delete: deleteProject
}