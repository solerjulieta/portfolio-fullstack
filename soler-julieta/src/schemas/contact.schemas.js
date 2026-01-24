import * as yup from 'yup'

//Función que genera el Schema, recibiendo la función de traducción "t"
export const getContactSchema = (t) => {
    // Si "t" no está definida, retorna un schema báasico.
    if(!t){
        return yup.object().shape({
            name: yup.string().trim("El nombre es requerido.").required("El nombre es requerido."),
            email: yup.string().email("El email es inválido.").required("El email es requerido."),
            message: yup.string().trim("El mensaje es requerido.").required("El mensaje es requerido.")
        })
    }

    return yup.object().shape({
        name: yup.string().trim(t('validation_required_name')).required(t('validation_required_name')),
        email: yup.string().email(t('validation_invalid_email')).required(t('validation_required_email')),
        message: yup.string().trim(t('validation_required_message')).required(t('validation_required_message'))
    })
}