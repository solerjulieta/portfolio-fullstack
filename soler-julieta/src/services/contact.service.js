import API from './api.service'

export async function sendEmail(emailData)
{
    return API.call({ uri: 'contact', method: 'POST', body: emailData })
}

export default{
    sendEmail
}