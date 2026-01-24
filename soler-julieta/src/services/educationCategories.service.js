import API from './api.service'

export async function getAll()
{
    return API.call({ uri: 'education-categories' })
}

export default{
    getAll,
}