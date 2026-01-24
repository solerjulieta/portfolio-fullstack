import API from './api.service'

export async function getAll()
{
    return API.call({ uri: 'skills' })
}

export async function getByCategory(category)
{
    return API.call({ uri: `skills/${category}` })
}

export default{
    getAll,
    getByCategory
}