import API from './api.service'

export async function getAll()
{
    return API.call({ uri: 'technologies' })
}

export default{
    getAll,
}