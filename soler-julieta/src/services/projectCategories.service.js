import API from './api.service'

export async function getAll()
{
    return API.call({ uri: 'project-categories' })
}

export default{
    getAll,
}