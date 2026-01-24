import * as accountService from '../../services/account.service.js'
import * as tokenService from '../../services/token.service.js'
import { identifyIdentifierType } from '../../utils/auth.utils.js'

async function register(req, res)
{
    const account = {
        user: req.body.user,
        email: req.body.email,
        password: req.body.password
    }

    accountService.register(account)
        .then((newAccount) => {
            res.status(201).json({ msg: 'Se ha registrado correctamente' })
        })
        .catch((err) => {
            res.status(400).json({ error: { msg: err.message } })
        })
}

async function login(req, res)
{
    const { identifier, password } = req.body

    const { email, user } = identifyIdentifierType(identifier)

    const userCredentials = { email, user, password }
    
    return accountService.login(userCredentials)
        .then(async (account) => {
            const token = await tokenService.create(account)

            //Guardo el token en una cookie HTTP-only
            res.cookie("auth_token", token, {
                httpOnly: true, //Evita que JS en el navegador pueda leerla
                secure: false, //Solo en HTTPS si esta en prod
                sameSite: "lax", //Evita CSRF
                maxAge: 1000 * 60 * 60 * 24 * 7 //7 días
            })
            //return { token: await tokenService.create(account), account }

            res.status(201).json({ account })
        })
        .catch((err) => {
            res.status(400).json({ error: { msg: err.message } })
        })
}

async function logout(req, res)
{
    const token = req.cookies.auth_token

    // Si el token no existe, respondemos igual como éxito o error 401/404, pero aquí asumimos un 200 para la simplicidad.
    if (!token) {
        return res.status(200).json({ msg: "Sesión ya estaba cerrada." })
    }

    return tokenService.remove(token)
        .then(() => {
            //Eliminar la cookie del lado del cliente
            res.clearCookie("auth_token", {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            })
            res.status(200).json({ msg: "Sesión cerrada correctamente." })
        })
        .catch((err) => {
            res.clearCookie("auth_token")
            res.status(400).json({ error: { msg: err.message } })
        })
}

async function forgotPassword(req, res)
{
    const { identifier } = req.body

    const { email, user } = identifyIdentifierType(identifier)

    const userIdentifier = { email, user }

    console.log("El identificador que se recibe en el controler es", userIdentifier)

    return accountService.forgotPassword(userIdentifier)
        .then(() => {
            res.status(200).json({ msg: "Te enviamos un email para que puedas restablecer tu contraseña." })
        })
        .catch((err) => {
            res.status(400).json({ error: { msg: err.message } })
        })
}

async function recoveryPassword(req, res)
{
    const token = req.params.token
    const newPassword = req.body.newPassword

    accountService.recoveryPassword(token, newPassword)
        .then(() => {
            res.status(200).json({ msg: 'Tu contraseña se restableció correctamente.' })
        })
        .catch((err) => {
            res.status(500).json({ error: { msg: err.message } })
        })
}

export{
    register,
    login,
    logout,
    forgotPassword,
    recoveryPassword
}