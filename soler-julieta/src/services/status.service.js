import API from './api.service'

export async function getAll()
{
    return API.call({ uri: 'status' })
}

export default{
    getAll,
}