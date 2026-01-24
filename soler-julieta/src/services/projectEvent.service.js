import API from './api.service'

export async function register(event)
{
    return API.call({ uri: 'projects/events', method: 'POST', body: event })
}

export async function getMostVisitedProject()
{
    return API.call({ uri: 'projects/most-visited' })
}

export async function getTopVisitedProject()
{
    return API.call({ uri: 'projects/top' })
}

export default{
    register,
    getMostVisitedProject,
    getTopVisitedProject
}