const BASE_URL = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL

export async function call({ uri, method = 'GET', body = undefined, isMultipart = false })
{
    const options = {
        method,
        credentials: 'include'
    }

    if(body){
        if(isMultipart){
            options.body = body
        } else {
            options.headers = {
                'Content-Type': 'application/json'
            }
            options.body = JSON.stringify(body)
        }
    }

    return fetch(`${BASE_URL}/api/${uri}`, options)
    .then(async response => {
        const data = await response.json().catch(() => {})
        if(!response.ok) throw data 
        return data
    })
    /*
    return fetch(`http://localhost:3000/api/${uri}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method,
        body: JSON.stringify(body),
        credentials: 'include' //Enviar y recibir cookies
    })
    .then(async response => {
        const data = await response.json().catch(() => {})

        if(!response.ok){
            throw data
        }

        return data

        //if (!response.ok) throw data // rechazo en caso de error
        //return data
    })*/
}

export default {
    call
}