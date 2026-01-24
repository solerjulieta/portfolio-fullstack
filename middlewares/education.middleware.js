import * as educationSchemas from '../schemas/education.schemas.js'

async function validateEducation(req, res, next)
{
    return educationSchemas.educationSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((data) => {
            req.body = data
            next()
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

export{
    validateEducation
}