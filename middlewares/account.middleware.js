import * as accountSchemas from '../schemas/account.schemas.js'

async function validateLogin(req, res, next)
{
    return accountSchemas.login.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((data) => {
            req.body = data 
            next()
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

async function validateUser(req, res, next)
{
    return accountSchemas.validUser.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((data) => {
            req.body = data
            next()
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

async function validateRecoveryPassword(req, res, next)
{
    return accountSchemas.recoveryPassword.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((data) => {
            req.body = data
            next()
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

export{
    validateLogin,
    validateUser,
    validateRecoveryPassword
}