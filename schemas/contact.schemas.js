import * as yup from 'yup'

const contactSchema = yup.object({
    name: yup.string().trim().required('El nombre es requerido.'),
    email: yup.string().email().required('El email es requerido.'),
    message: yup.string().trim().required('El mensaje es requerido.')
})

export{
    contactSchema
}