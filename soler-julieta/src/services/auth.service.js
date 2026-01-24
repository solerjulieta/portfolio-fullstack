import API from './api.service'

export async function login({ identifier, password })
{
    return API.call({ uri: 'admin/login', method: 'POST', body: { identifier, password } })
}

export async function IsLogin()
{
    return API.call({ uri: 'admin/check', method: 'GET' })
}

export async function logout()
{
    return API.call({ uri: 'admin/logout', method: 'DELETE' })
}

export async function forgotPassword({ identifier })
{
    const bodyData = { identifier: identifier }

    return API.call({ uri: 'admin/forgotPassword', method: 'POST', body: bodyData })
}

export async function recoveryPassword(token, data)
{
    return API.call({ uri: `admin/forgotPassword/${token}`, method: 'POST', body: data })
}

export default{
    login,
    logout,
    forgotPassword,
    recoveryPassword
}