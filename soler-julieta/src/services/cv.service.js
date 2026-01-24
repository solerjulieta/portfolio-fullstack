import API from './api.service'

export async function getTotals()
{
    return API.call({ uri: 'admin/cv' })
}

export async function getDownloadsByRoleAndLang()
{
    return API.call({ uri: 'cv/totalDownloads' })
}

export default{
    getTotals,
    getDownloadsByRoleAndLang
}